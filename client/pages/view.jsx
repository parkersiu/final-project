import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';
import Cards from '../components/cards';
import TaskModal from '../components/taskmodal';

function ProjectView(props) {
  const [pageTitle] = useState('Project Title');
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
    taskValues.map();
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
    const taskIndex = parseInt(event.target.getAttribute('id'));
    const complete = taskValues[taskIndex].isCompleted;
    if (complete) {
      setTaskValues(
        milestoneValues.map((element, i) => {
          if (i === taskIndex) {
            return { ...element, isCompleted: !complete, className: 'form-check-label' };
          } else {
            return element;
          }
        })
      );
    }
    if (!complete) {
      setTaskValues(
        milestoneValues.map((element, i) => {
          if (i === taskIndex) {
            return { ...element, isCompleted: !complete, className: 'form-check-label strike' };
          } else {
            return element;
          }
        })
      );
    }
  };

  const handleUpdateTask = event => {
    setCurrentTask({
      ...currentTask,
      taskName: event.target.value
    });
  };

  const handleSubmitTask = event => {
    event.preventDefault();
    const milestoneId = currentTask.milestoneId;
    const task = { taskName: currentTask.taskName, isDeleted: currentTask.isDeleted };
    const newTask = { taskName: currentTask.taskName, isCompleted: false, className: 'form-check-label', projectId, milestoneId };
    if (currentTask.newTask) {
      setTaskValues([
        ...taskValues,
        newTask
      ]);
      postTasks(newTask);
    } else {
      setTaskValues([...taskValues]);
      const taskId = parseInt(currentTask.taskId);
      patchTask(task, taskId);
    }
  };

  async function getTasks(projectId) {
    const response = await fetch(`/api/tasks/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    setTaskValues(data);
  }

  async function getMilestones(projectId) {
    const response = await fetch(`/api/milestones/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    setMilestoneValues(data);
  }

  const postTasks = newTasks => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTasks)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  };

  const patchTask = (taskName, taskId) => {
    fetch(`api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskName)
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

  useEffect(() => {
    getMilestones(projectId);
    getTasks(projectId);
  }, [projectId]);

  return (
    <div>
      <TaskModal taskName={currentTask.taskName} updateTask={handleUpdateTask}
        submit={handleSubmitTask} delete={handleRemoveTask} dataIndex={currentTask.taskIndex} type={currentTask.type} />
      <PageTitle pageTitle={pageTitle} />
      <div className='container'>
        <div className='row d-flex flex-nowrap overflow-x-auto'>
          <div className='col' />
          <Cards milestoneValues={milestoneValues} taskValues={taskValues}
            click={handleAddTask} change={handleComplete} edit={handleEditTask}
            currentTask={currentTask} />
          <div className='col' />
        </div>
      </div>
    </div>
  );
}

export default function View(props) {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <ProjectView projectId={props.projectId} />
    </div>
  );
}
