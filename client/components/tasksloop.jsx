import React from 'react';

export default function TasksLoop(props) {
  const tasks = [];
  const taskArray = props.taskValues;
  for (let i = 0; i < taskArray.length; i++) {
    const taskName = taskArray[i].taskName;
    const className = taskArray[i].className;
    const milestoneId = taskArray[i].milestoneId;
    if (milestoneId === props.referenceId) {
      tasks.push(
        <li className="list-group-item">
          <input className="form-check-input me-1" type="checkbox" value={taskName} id={i} onChange={props.change} />
          <label className={className} htmlFor={i}>{taskName}</label>
          <a data-bs-toggle="modal" data-bs-target='#exampleModal'><i className="fa-solid fa-ellipsis float-end mt-1" /></a>
        </li>
      );
    }
  }
  return tasks;
}
