import React from 'react';
import TasksLoop from './tasksloop';

export default function CardsLoop(props) {
  const cards = [];
  const milestoneArray = props.milestoneValues;
  for (let i = 0; i < milestoneArray.length; i++) {
    const milestoneName = milestoneArray[i].milestoneName;
    const milestoneId = milestoneArray[i].milestoneId;
    cards.push(
      <div className='col'>
        <div className='card text-bg-light mb-3 mt-3'>
          <div className='card-header'>{milestoneName}</div>
          <ul className='list-group list-group-flush'>
            <TasksLoop {...props} milestoneId={milestoneId} />
            <li className='list-group-item'>Add a task <i className="fa-solid fa-plus float-end mt-1"
              id={milestoneId} onClick={props.click} data-bs-toggle="modal" data-bs-target='#taskModal' /></li>
          </ul>
        </div>
      </div>
    );
  } return cards;
}
