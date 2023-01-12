import React from 'react';

export default function Tasks(props) {
  const tasks = [];
  const taskArray = props.taskValues;
  taskArray.map(taskArray => {
    const taskName = taskArray.taskName;
    const className = taskArray.className;
    const milestoneId = taskArray.milestoneId;
    if (milestoneId === props.milestoneId && !taskArray.isDeleted) {
      tasks.push(
        <li className="list-group-item" key={taskArray.taskId}>
          <input className="form-check-input me-1" type="checkbox" value={taskName} id={taskArray.taskId} onChange={props.change} />
          <label className={className} htmlFor={taskArray.taskId}>{taskName}</label>
          <a data-bs-toggle="modal" data-bs-target='#taskModal'>
            <i id={taskName} data-index={taskArray.taskId} className="fa-solid fa-ellipsis float-end mt-1" onClick={props.edit} />
          </a>
        </li>
      );
    } return tasks;
  }); return tasks;
}
