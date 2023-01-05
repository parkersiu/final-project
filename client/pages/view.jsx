import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';

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
          key: 1
        },
        {
          taskName: 'Task 2',
          isCompleted: false,
          className: 'form-check-label stretched-link',
          projectId: 1,
          key: 2
        }
      ],
      milestoneValues: [{
        milestoneName: 'Milestone 1'
      }, {
        milestoneName: 'Milestone 2'
      }, {
        milestoneName: 'Milestone 3'
      }]
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.tasksLoop = this.tasksLoop.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.cardsLoop = this.cardsLoop.bind(this);
  }

  handleAddTask(event) {
    let taskCounter = this.state.taskCounter;
    const taskValues = this.state.taskValues;
    taskValues.push({ taskName: 'New Task', isCompleted: false, className: 'form-check-label stretched-link', projectId: 1 });
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
      taskValues[i].className = 'form-check-label stretched-link';
    }
    if (!complete) {
      taskValues[i].isCompleted = !taskValues[i].isCompleted;
      taskValues[i].className = 'form-check-label stretched-link strike';
    }
    this.setState({
      taskValues
    });
  }

  tasksLoop() {
    const tasks = [];
    for (let i = 0; i < this.state.taskValues.length; i++) {
      const taskName = this.state.taskValues[i].taskName;
      const className = this.state.taskValues[i].className;
      const key = this.state.taskValues[i].key;
      tasks.push(
        <li className="list-group-item" key={key}>
          <input className="form-check-input me-1" type="checkbox" value={taskName} id={i} onChange={this.handleComplete} />
          <label className={className} htmlFor={i}>{taskName}</label>
          <i className="fa-solid fa-ellipsis float-end mt-1" />
        </li>
      );
    }
    return tasks;
  }

  cardsLoop() {
    const cards = [];
    for (let i = 0; i < this.state.milestoneValues.length; i++) {
      const milestoneName = this.state.milestoneValues[i].milestoneName;
      cards.push(
        <div className='col'>
          <div className='card text-bg-light mb-3 mt-3'>
            <div className='card-header'>{milestoneName}</div>
            <ul className='list-group list-group-flush'>
              {this.tasksLoop()}
              <li className='list-group-item' key={i}>Add a task <i className="fa-solid fa-plus float-end mt-1" onClick={this.handleAddTask} /></li>
            </ul>
          </div>
        </div>
      );
    }
    return cards;
  }

  render() {
    return (
      <div>
        <PageTitle pageTitle={this.state.pageTitle} />
        <div className='container'>
          <div className='row d-flex flex-nowrap overflow-x-auto'>
            <div className='col' />
            {this.cardsLoop()}
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
