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
      taskCounter: 2,
      milestoneCounter: 3,
      taskValues: [
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          milestoneId: 1
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          milestoneId: 1
        },
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          milestoneId: 2
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          milestoneId: 2
        },
        {
          taskName: 'Task 1',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          milestoneId: 3
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label stretched-link',
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
  }

  handleAddTask(event) {
    let taskCounter = this.state.taskCounter;
    const taskValues = this.state.taskValues;
    const eventId = parseInt(event.target.id);
    taskValues.push({ taskName: 'New Task', isCompleted: false, className: 'form-check-label stretched-link', projectId: 1, milestoneId: eventId });
    taskCounter++;
    this.setState({
      taskCounter,
      taskValues
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

  render() {
    return (
      <div>
        <PageTitle pageTitle={this.state.pageTitle} />
        <div className='container'>
          <div className='row d-flex flex-nowrap overflow-x-auto'>
            <div className='col' />
            <CardsLoop milestoneValues={this.state.milestoneValues} taskValues={this.state.taskValues} click={this.handleAddTask} change={this.handleComplete} />
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
      <TaskModal />
      <Navbar />
      <Breadcrumb />
      <ProjectView />
    </div>
  );
}
