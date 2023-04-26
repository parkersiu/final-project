import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReactCalendar(props) {
  const [value, onChange] = useState(new Date());
  const milestoneId = props.milestoneId;

  const setDate = value => {
    onChange(value);
    const dueDate = { date: value.toISOString() };

    fetch(`api/deadline/${milestoneId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dueDate)
    })
      .then(res => res.json())
      .then(data => {
        onChange(data);
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div>
      <Calendar onChange={setDate} value={value} />
      {/* <Calendar onChange={onChange} value={value} onClickDay={setDate} /> */}
    </div>
  );
}
