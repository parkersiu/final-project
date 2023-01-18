import React from 'react';

export default function PageTitle(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col' />
        <div className='col-10'>
          <h1>{props.pageTitle}</h1>
        </div>
        <div className='col' />
      </div>
    </div>
  );
}
