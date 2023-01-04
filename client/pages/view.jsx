import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestoneName: '',
      projectId: 1,
      inputCounter: 3,
      inputValues: [{
        milestoneName: ''
      }, {
        milestoneName: ''
      }, {
        milestoneName: ''
      }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveInput = this.handleRemoveInput.bind(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.inputsLoop = this.inputsLoop.bind(this);
  }

  handleRemoveInput(event) {
    let inputCounter = this.state.inputCounter;
    inputCounter--;
    const inputs = this.state.inputValues;
    const i = parseInt(event.target.getAttribute('id'));
    inputs.splice(i, 1);
    this.setState({
      inputCounter,
      inputValues: inputs
    });
  }

  handleAddInput(event) {
    let inputCounter = this.state.inputCounter;
    const inputValues = this.state.inputValues;
    inputValues.push({ milestoneName: '' });
    inputCounter++;
    this.setState({
      inputCounter,
      inputValues
    });
  }

  handleInputChange(event) {
    const inputs = this.state.inputValues;
    const value = event.target.value;
    const i = event.target.name;
    inputs[i].milestoneName = value;
    this.setState({ inputValues: inputs });
  }

  inputsLoop() {
    const inputs = [];
    for (let i = 0; i < this.state.inputCounter; i++) {
      inputs.push(<div className='input-group mb-3' key={i}>
        <span className='input-group-text'>{i + 1}</span>
        <input className='form-control' type="text" placeholder='Enter a milestone'
          name={i} value={this.state.inputValues[i].milestoneName} onChange={this.handleInputChange} />
        <span className='input-group-text'>
          <i className="fa-solid fa-x" id={i} onClick={this.handleRemoveInput} />
        </span>
      </div>);
    }
    return inputs;
  }

  handleSubmit(event) {
    function addMilestone(newMilestone) {
      fetch('/api/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone)
      })
        .then(res => res.json())
        .catch(err => console.error('Error:', err));
    }
    event.preventDefault();
    const projectId = this.state.projectId;
    for (let i = 0; i < this.state.inputValues.length; i++) {
      const milestoneName = this.state.inputValues[i].milestoneName;
      const newMilestone = { milestoneName, projectId };
      addMilestone(newMilestone);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col'>
            <div className='card text-bg-light mb-3 mt-3'>
              <div className='card-header'>Milestone 1</div>
              <ul className='list-group list-group-flush'>
                <li className="list-group-item">
                  <input className="form-check-input me-1" type="checkbox" value="" />
                  <label className="form-check-label stretched-link" htmlFor="firstCheckboxStretched">Task 1 </label>
                  <i className="fa-solid fa-ellipsis float-end mt-1" />
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-1" type="checkbox" value="" />
                  <label className="form-check-label stretched-link" htmlFor="firstCheckboxStretched">Task 2 </label>
                  <i className="fa-solid fa-ellipsis float-end mt-1" />
                </li>
                <li className='list-group-item'>Add a task <i className="fa-solid fa-plus float-end mt-1" /></li>
              </ul>
            </div>
          </div>
          <div className='col' />
        </div>
      </div>
    );
  }
}

export default function Projects(props) {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <PageTitle />
      <ProjectView />
    </div>
  );
}
