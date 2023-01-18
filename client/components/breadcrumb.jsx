import React from 'react';

export default function Breadcrumb(props) {
  return (
    <div className='container mt-3'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Projects</a></li>
          <li className="breadcrumb-item active" aria-current="page">View</li>
        </ol>
      </nav>
    </div>
  );
}
