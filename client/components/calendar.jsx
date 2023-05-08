import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ReactCalendar(props) {
  const [date, setDate] = useState(props.milestone.dueDate);
  const [milestone, setMilestone] = useState(props.milestone);

  const milestoneId = props.milestone.milestoneId;

  const dateHandler = d => {
    setDate(new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000));
  };

  const fetchDate = value => {
    if (value !== null) {
      const dueDate = value;

      fetch(`api/deadline/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...milestone, dueDate })
      })
        .then(res => res.json())
        .then(data => {
          setMilestone(data);
          dateHandler(new Date(data[0].dueDate));
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
          setDate(null);
        })
        .catch(err => console.error('Error:', err));
    }
  };

  return (
    <div>
      <Calendar onChange={fetchDate} value={date} />
      <div className="mt-3 me-3">
        <button type='button' className='btn btn-secondary btn-sm float-start' data-bs-dismiss="offcanvas"
        onClick={ () => { fetchDate(null); }}>Clear</button>
        <button type='button' className='btn btn-primary btn-sm float-end' data-bs-dismiss="offcanvas"
        onClick={() => { fetchDate(date); }}>Confirm</button>
      </div>
    </div>
  );
}
