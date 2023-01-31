import React from 'react';
import Tasks from './tasks';
import GrowSpinner from './grow-spinner';

export default function Cards(props) {
  const cards = [];
  const milestoneArray = props.milestoneValues;
  milestoneArray.map(milestoneArray => {
    const milestoneName = milestoneArray.milestoneName;
    const milestoneId = milestoneArray.milestoneId;
    cards.push(
      <div className='col' key={milestoneArray.milestoneId}>
        <div className='card text-bg-light mb-3 mt-3'>
          <div className='card-header'>{milestoneName}</div>
          <ul className='list-group list-group-flush'>
            {props.taskLoading
              ? <GrowSpinner />
              : <Tasks {...props} milestoneId={milestoneId} />
            }
            <li className='list-group-item' key={milestoneArray.milestoneId}>Add a task <i className="fa-solid fa-plus float-end mt-1"
                id={milestoneId} onClick={props.click} data-bs-toggle="modal" data-bs-target='#taskModal' /></li>
          </ul>
        </div>
      </div>
    ); return cards;
  }); return cards;
}
