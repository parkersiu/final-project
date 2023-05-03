import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReactCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [milestone, setMilestone] = useState(props.milestone);

  const milestoneId = props.milestone.milestoneId;

  const setDate = value => {
    if (value !== null) {
      const dueDate = value.toISOString();

      fetch(`api/deadline/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...milestone, dueDate })
      })
        .then(res => res.json())
        .then(data => {
          setMilestone(data);
          onChange(data.milestoneId);
        })
        .catch(err => console.error('Error:', err));
    }
    if (value === null) {
      fetch(`api/deadline/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...milestone, dueDate: null })
      })
        .then(res => res.json())
        .then(data => {
          setMilestone(data);
          onChange(data.milestoneId);
        })
        .catch(err => console.error('Error:', err));
    }
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <div className="mt-3 me-3">
        <button type='button' className='btn btn-secondary btn-sm float-start' onClick={ () => { setDate(null); }}>Clear</button>
        <button type='button' className='btn btn-primary btn-sm float-end' onClick={() => { setDate(value); }}>Confirm</button>
      </div>
    </div>
  );
}
