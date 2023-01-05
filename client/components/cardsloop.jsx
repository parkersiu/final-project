import React from 'react';
import TasksLoop from './tasksloop';

export default function CardsLoop(props) {
  const cards = [];
  const milestoneArray = props.milestoneValues;
  for (let i = 0; i < milestoneArray.length; i++) {
    const milestoneName = milestoneArray[i].milestoneName;
    const referenceId = milestoneArray[i].milestoneId;
    cards.push(
      <div className='col'>
        <div className='card text-bg-light mb-3 mt-3'>
          <div className='card-header'>{milestoneName}</div>
          <ul className='list-group list-group-flush'>
            <TasksLoop {...props} referenceId={referenceId} />
            <li className='list-group-item'>Add a task <i className="fa-solid fa-plus float-end mt-1" id={referenceId} onClick={props.click} /></li>
          </ul>
        </div>
      </div>
    );
  } return cards;
}
