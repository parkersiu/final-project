import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';
import Cards from '../components/cards';
import TaskModal from '../components/taskmodal';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Project Title',
      projectId: 1,
      currentTask: {
        taskName: '',
        taskId: 0,
        newTask: false
      },
      taskValues: [],
      milestoneValues: []
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }

  handleAddTask(event) {
    const taskValues = this.state.taskValues;
    const currentTask = this.state.currentTask;
    currentTask.taskName = 'New Task';
    currentTask.newTask = true;
    const eventId = parseInt(event.target.id);
    taskValues.push({ taskName: 'New Task', isCompleted: false, className: 'form-check-label', projectId: 1, milestoneId: eventId });
    currentTask.taskIndex = taskValues.length - 1;
    this.setState({
      currentTask,
      taskValues
    });
  }

  handleRemoveTask(event) {
    const taskValues = this.state.taskValues;
    const currentTask = this.state.currentTask;
    const currentTaskId = currentTask.taskId;
    const index = taskValues.findIndex(taskValues => taskValues.taskId === currentTaskId);
    const task = taskValues[index];
    const taskId = taskValues[index].taskId;
    task.isDeleted = true;
    this.deleteTask(task, taskId);
    taskValues.splice(index, 1);
    this.setState({
      taskValues
    });
  }

  handleEditTask(event) {
    const currentTask = this.state.currentTask;
    const taskId = parseInt(event.target.getAttribute('data-index'));
    currentTask.taskName = event.target.id;
    currentTask.taskId = taskId;
    currentTask.newTask = false;
    this.setState({
      currentTask
    });
  }

  handleComplete(event) {
    const taskValues = this.state.taskValues;
    const i = parseInt(event.target.getAttribute('id'));
    const complete = taskValues[i].isCompleted;
    if (complete) {
      taskValues[i].isCompleted = !taskValues[i].isCompleted;
      taskValues[i].className = 'form-check-label';
    }
    if (!complete) {
      taskValues[i].isCompleted = !taskValues[i].isCompleted;
      taskValues[i].className = 'form-check-label strike';
    }
    this.setState({
      taskValues
    });
  }

  handleUpdateTask(event) {
    const currentTask = this.state.currentTask;
    const taskValues = this.state.taskValues;
    taskValues[currentTask.taskIndex].taskName = event.target.value;
    currentTask.taskName = event.target.value;
    this.setState({ currentTask, taskValues });
  }

  handleSubmitTask(event) {
    event.preventDefault();
    const currentTask = this.state.currentTask;
    const newTask = this.state.taskValues[currentTask.taskIndex];
    const taskId = newTask.taskId;
    if (currentTask.newTask) {
      this.postTasks(newTask);
    } else {
      this.patchTask(newTask, taskId);
    }
  }

  getTasks(projectId) {
    fetch(`api/tasks/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => this.setState({
        taskValues: data
      }))
      .catch(err => console.error('Error:', err));
  }

  getMilestones(projectId) {
    fetch(`api/milestones/${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => this.setState({
        milestoneValues: data
      }))
      .catch(err => console.error('Error:', err));
  }

  postTasks(newTasks) {
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTasks)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  }

  patchTask(taskName, taskId) {
    fetch(`api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskName)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  }

  deleteTask(task, taskId) {
    fetch(`api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err));
  }

  componentDidMount() {
    const projectId = this.state.projectId;
    this.getMilestones(projectId);
    this.getTasks(projectId);
  }

  render() {
    return (
      <div>
        <TaskModal taskName={this.state.currentTask.taskName} updateTask={this.handleUpdateTask}
        submit={this.handleSubmitTask} delete={this.handleRemoveTask} dataIndex={this.state.currentTask.taskIndex} />
        <PageTitle pageTitle={this.state.pageTitle} />
        <div className='container'>
          <div className='row d-flex flex-nowrap overflow-x-auto'>
            <div className='col' />
            <Cards milestoneValues={this.state.milestoneValues} taskValues={this.state.taskValues}
            click={this.handleAddTask} change={this.handleComplete} edit={this.handleEditTask}
            currentTask={this.state.currentTask} />
            <div className='col' />
          </div>
        </div>
      </div>
    );
  }
}

export default function View(props) {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <ProjectView />
    </div>
  );
}
