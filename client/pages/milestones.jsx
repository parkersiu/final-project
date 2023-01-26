import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';
import PageTitle from '../components/pagetitle';

function MilestoneForm(props) {
  const [pageTitle] = useState('Project Name');
  const [projectId, setProjectId] = useState(parseInt(props.projectId));
  const [milestoneCounter, setMilestoneCounter] = useState(1);
  const [milestoneValues, setMilestoneValues] = useState([
    { milestoneName: '' }
  ]);

  const handleRemoveInput = event => {
    setMilestoneCounter(milestoneCounter - 1);
    const eventId = parseInt(event.target.getAttribute('id'));
    setMilestoneValues(
      milestoneValues.filter((_, i) => i !== eventId)
    );
  };

  const handleAddInput = event => {
    setMilestoneCounter(milestoneCounter + 1);
    setMilestoneValues(
      [...milestoneValues, { milestoneName: '' }]
    );
  };

  const handleInputChange = event => {
    const value = event.target.value;
    const eventIndex = parseInt(event.target.name);
    setMilestoneValues(milestoneValues.map(
      (element, i) => {
        if (i === eventIndex) {
          return { ...element, milestoneName: value };
        } else {
          return element;
        }
      }
    ));
  };

  const inputsLoop = () => {
    const inputs = [];
    for (let i = 0; i < milestoneCounter; i++) {
      inputs.push(
        <div className='input-group mb-3' key={i}>
          <span className='input-group-text'>{i + 1}</span>
          <input required className='form-control' type="text" placeholder='Enter a milestone'
          name={i} value={milestoneValues[i].milestoneName} onChange={handleInputChange} />
          <span className='input-group-text'>
            <i className="fa-solid fa-x" id={i} onClick={handleRemoveInput} />
          </span>
        </div>
      );
    }
    return inputs;
  };

  const handleSubmit = event => {
    event.preventDefault();
    async function addMilestone(newMilestone) {
      const response = await fetch('/api/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone)
      });
      const data = await response.json();
      const newProjectId = data.projectId;
      setProjectId(newProjectId);
      window.location.href = `#view?projectId=${projectId}?projectTitle=${pageTitle}`;
    }
    for (let i = 0; i < milestoneValues.length; i++) {
      const milestoneName = milestoneValues[i].milestoneName;
      const newMilestone = { milestoneName, projectId };
      addMilestone(newMilestone);
    }
  };

  return (
    <div>
      <PageTitle pageTitle={pageTitle} />
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6 mt-2 ms-5 mb-2'>Milestones:</div>
          <div className='col' />
        </div>
        <div className='row'>
          <div className='col' />
          <div className='col'>
            <form onSubmit={handleSubmit}>
              {inputsLoop()}
              <i className="fa-solid fa-plus mt-2 ms-2" onClick={handleAddInput} />
              <button className='btn btn-primary float-end' type='submit'>Done</button>
            </form>
          </div>
          <div className='col' />
        </div>
      </div>
    </div>
  );
}

export default function Milestones(props) {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <MilestoneForm projectId={props.projectId} />
    </div>
  );
}
