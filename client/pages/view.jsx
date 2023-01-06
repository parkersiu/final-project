import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';
import CardsLoop from '../components/cardsloop';
import TaskModal from '../components/taskmodal';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Project Name',
      milestoneCounter: 3,
      currentTask: {
        taskName: '',
        taskIndex: 1
      },
      taskValues: [
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 1
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 1
        },
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 2
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 2
        },
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 3
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label',
          projectId: 1,
          milestoneId: 3
        }
      ],
      milestoneValues: [{
        milestoneName: 'Milestone 1',
        milestoneId: 1
      }, {
        milestoneName: 'Milestone 2',
        milestoneId: 2
      }, {
        milestoneName: 'Milestone 3',
        milestoneId: 3
      }]
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
  }

  handleAddTask(event) {
    const taskValues = this.state.taskValues;
    const eventId = parseInt(event.target.id);
    taskValues.push({ taskName: 'New Task', isCompleted: false, className: 'form-check-label stretched-link', projectId: 1, milestoneId: eventId });
    this.setState({
      taskValues
    });
  }

  handleEditTask(event) {
    const currentTask = this.state.currentTask;
    const index = parseInt(event.target.getAttribute('data-index'));
    currentTask.taskName = event.target.id;
    currentTask.taskIndex = index;
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
    currentTask.taskName = event.target.value;
    this.setState({ currentTask });
  }

  handleSubmitTask(event) {
    const taskValues = this.state.taskValues;
    const index = this.state.currentTask.taskIndex;
    event.preventDefault();
    taskValues[index].taskName = this.state.currentTask.taskName;
    this.setState({
      taskValues
    });
  }

  render() {
    return (
      <div>
        <TaskModal taskName={this.state.currentTask.taskName} updateTask={this.handleUpdateTask}
        submit={this.handleSubmitTask} />
        <PageTitle pageTitle={this.state.pageTitle} />
        <div className='container'>
          <div className='row d-flex flex-nowrap overflow-x-auto'>
            <div className='col' />
            <CardsLoop milestoneValues={this.state.milestoneValues} taskValues={this.state.taskValues}
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
