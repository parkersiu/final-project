import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import PageTitle from '../components/page-title';
import Cards from '../components/cards';
import TaskModal from '../components/task-modal';
import GrowSpinner from '../components/grow-spinner';

function ProjectView(props) {
  const [milestoneLoading, setMilestoneLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [projectId] = useState(parseInt(props.projectId));
  const [currentTask, setCurrentTask] = useState({
    taskName: '',
    taskId: 0,
    isCompleted: false,
    projectId: 1,
    milestoneId: 0,
    isDeleted: false,
    newTask: false,
    type: 'Add'
  });
  const [taskValues, setTaskValues] = useState([]);
  const [milestoneValues, setMilestoneValues] = useState([]);

  const handleAddTask = event => {
    const eventId = parseInt(event.target.id);
    setCurrentTask({
      ...currentTask,
      taskName: 'New Task',
      newTask: true,
      milestoneId: eventId,
      taskIndex: taskValues.length - 1,
      type: 'Add'
    });
  };

  const handleRemoveTask = event => {
    const currentTaskId = currentTask.taskId;
    const taskIndex = taskValues.findIndex(taskValues => taskValues.taskId === currentTaskId);
    const task = taskValues[taskIndex];
    const taskId = taskValues[taskIndex].taskId;
    task.isDeleted = true;
    deleteTask(task, taskId);
    setTaskValues(
      taskValues.filter((_, i) => i !== taskIndex)
    );
  };

  const handleEditTask = event => {
    const taskId = parseInt(event.target.getAttribute('data-index'));
    setCurrentTask({
      ...currentTask,
      taskName: event.target.id,
      taskId,
      newTask: false,
      type: 'Edit'
    });
  };

  const handleComplete = event => {
    if (event.target.tagName === 'LABEL') {
      const inputChild = event.target.previousSibling;
      const inputTaskId = parseInt(inputChild.getAttribute('data-taskid'));
      const task = taskValues.find(({ taskId }) => taskId === inputTaskId);
      const complete = task.isCompleted;
      if (complete) {
        patchTask({ taskName: task.taskName, isDeleted: false, isCompleted: false }, inputTaskId);
        getTasks(projectId);
      }
      if (!complete) {
        patchTask({ taskName: task.taskName, isDeleted: false, isCompleted: true }, inputTaskId);
        getTasks(projectId);
      }
    }
  };

  const handleUpdateTask = event => {
    setCurrentTask({
      ...currentTask,
      taskName: event.target.value
    });
  };

  const handleEditMilestone = event => {
    const milestoneId = parseInt(event.target.getAttribute('data-milestoneid'));
    const milestone = { milestoneName: event.target.value };
    patchMilestones(milestoneId, milestone);
  };

  const handleSubmitTask = event => {
    event.preventDefault();
    const milestoneId = currentTask.milestoneId;
    const task = { taskName: currentTask.taskName, isDeleted: currentTask.isDeleted, isCompleted: false };
    const newTask = { taskName: currentTask.taskName, isCompleted: false, className: 'form-check-label', projectId, milestoneId };
    if (currentTask.newTask) {
      setTaskValues([
        ...taskValues,
        newTask
      ]);
      postTasks(newTask);
      getTasks(projectId);
    }
    if (!currentTask.newTask) {
      setTaskValues([...taskValues]);
      const taskId = parseInt(currentTask.taskId);
      patchTask(task, taskId);
      getTasks(projectId);
    }
  };

  const getTasks = projectId => {
    setTaskLoading(true);
    fetch(`api/tasks/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setTaskValues(data);
        setTaskLoading(false);
      })
      .catch(err => console.error('Error:', err));
  };

  const getMilestones = projectId => {
    setMilestoneLoading(true);
    fetch(`/api/milestones/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        setMilestoneValues(res);
        setMilestoneLoading(false);
      })
      .catch(err => console.error('Error:', err));
  };

  const patchMilestones = (milestoneId, milestone) => {
    fetch(`/api/milestones/${milestoneId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(milestone)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const postTasks = newTasks => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTasks)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const patchTask = (task, taskId) => {
    fetch(`api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const deleteTask = (task, taskId) => {
    fetch(`api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const getProject = projectId => {
    fetch(`api/projects/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setPageTitle(data[0].title))
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    const loadProjectData = async () => {
      await getProject(projectId);
      await getMilestones(projectId);
      await getTasks(projectId);
    };
    loadProjectData();
  }, [projectId]);

  return (
    <div>
      <TaskModal taskName={currentTask.taskName} updateTask={handleUpdateTask}
        submit={handleSubmitTask} delete={handleRemoveTask} dataIndex={currentTask.taskIndex} type={currentTask.type} />
      <PageTitle pageTitle={pageTitle} />
      <div className='container'>
        <div className='row d-flex flex-nowrap overflow-x-auto'>
          <div className='col' />
          {milestoneLoading
            ? <GrowSpinner />
            : <Cards milestoneValues={milestoneValues} taskValues={taskValues}
            click={handleAddTask} complete={handleComplete} edit={handleEditTask}
            currentTask={currentTask} taskLoading={taskLoading} editMilestone={handleEditMilestone} />
            }
          <div className='col' />
        </div>
      </div>
    </div>
  );
}

export default function View(props) {
  return (
    <div>
      <Navbar setUser={props.setUser} userId={props.userId} />
      <ProjectView projectId={props.projectId} />
    </div>
  );
}
