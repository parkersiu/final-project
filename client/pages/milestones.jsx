import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';

class MilestoneForm extends React.Component {
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
    const milestoneName = this.state.milestoneName;
    const projectId = this.state.projectId;
    const newMilestone = { milestoneName, projectId };
    event.preventDefault();
    addMilestone(newMilestone);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6 mt-2 ms-5 mb-2'>Milestones:</div>
          <div className='col' />
        </div>
        <div className='row'>
          <div className='col' />
          <div className='col'>
            <form onSubmit={this.handleSubmit}>
              {this.inputsLoop()}
              <i className="fa-solid fa-plus mt-2 ms-2" onClick={this.handleAddInput} />
              <button className='btn btn-primary float-end' type='submit'>Done</button>
            </form>
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
      <MilestoneForm />
    </div>
  );
}
