import React from 'react';
import GrowSpinner from './grow-spinner';

export default function ProjectCards(props) {
  const { projects, projectsLoading } = props;

  const renderProjects = projects => {
    if (projects) {
      return projects.map(project => {
        return (
          <div className='col d-flex justify-content-center' key={project.projectId}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{project.title}</h5>
                <p className='card-text'>{project.description}</p>
                <a className='card-link'>Card Link</a>
                <a className='card-link'>Another link</a>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  if (projectsLoading) {
    return (
      <div className="row mt-5">
        <div className="col" />
        <GrowSpinner />
        <div className="col" />
      </div>
    );
  } else if (!projectsLoading) {
    return (
      <div className='container mt-4'>
        <div className='row row-cols-1 row-cols-md-2 g-4'>
          <div className='col d-flex justify-content-center'>
            <div className='card dash'>
              <div className='card-body'>
                <h5 className='card-title'>Create a card</h5>
                <p className='card-text'>Some quick example text to build on the card
                  title and make up the bulk of the card&apos;s content</p>
                <a className='card-link'>Card Link</a>
                <a className='card-link'>Another link</a>
              </div>
            </div>
          </div>
          {renderProjects(projects)}
        </div>
      </div>
    );
  }
}
