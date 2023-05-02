import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReactCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [milestone, setMilestone] = useState(props.milestone);

  const milestoneId = props.milestone.milestoneId;

  const setDate = value => {
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
  };

  return (
    <div>
      <Calendar onChange={setDate} value={value} />
    </div>
  );
}
