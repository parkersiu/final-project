import React from 'react';
import Tasks from './tasks';
import GrowSpinner from './grow-spinner';
import ReactCalendar from './calendar';

export default function Cards(props) {
  const cards = [];
  const milestoneArray = props.milestoneValues;
  milestoneArray.map(milestone => {
    const milestoneName = milestone.milestoneName;
    const milestoneId = milestone.milestoneId;
    cards.push(
      <div className='col' key={milestone.milestoneId}>
        <div className='card text-bg-light mb-3 mt-3'>
          <div className='card-header'><input className='milestone-input' type='text' defaultValue={milestoneName}
          onChange={props.editMilestone} data-milestoneid={milestoneId} />
            <i className="fa-solid fa-calendar-days float-end mt-1" data-bs-toggle="offcanvas" data-bs-target={`#offcanvas${milestoneId}`} aria-controls="offcanvasRight" />
            <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvas${milestoneId}`} aria-labelledby={`offcanvas${milestoneId}Label`}>
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id={`offcanvas${milestoneId}Label`}>Assign a due date:</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
              </div>
              <div className="offcanvas-body">
                <ReactCalendar milestoneId={milestoneId} milestone={milestone} />
              </div>
            </div>
          </div>
          <ul className='list-group list-group-flush'>
            {props.taskLoading
              ? <GrowSpinner />
              : <Tasks {...props} milestoneId={milestoneId} />
            }
            <li className='list-group-item' key={milestone.milestoneId}>Add a task <i className="fa-solid fa-plus float-end mt-1"
                id={milestoneId} onClick={props.click} data-bs-toggle="modal" data-bs-target='#taskModal' /></li>
          </ul>
        </div>
      </div>
    ); return cards;
  }); return cards;
}
