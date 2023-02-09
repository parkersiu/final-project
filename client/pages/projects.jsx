import React, { useState } from 'react';
import Navbar from '../components/navbar';
import PageTitle from '../components/page-title';

function Form(props) {
  const [pageTitle] = useState('Create a project');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId] = useState(1);
  // eslint-disable-next-line
  const [projectId, setProjectId] = useState(0);

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newProject = { title, description, userId };
    async function fetchProject(newProject) {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      const data = await response.json();
      const projectId = data.projectId;
      setProjectId(projectId);
      window.location.href = `#milestones?projectId=${projectId}`;
    }
    fetchProject(newProject);
  };

  return (
    <div>
      <PageTitle pageTitle={pageTitle}/>
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6'>
            <form onSubmit={handleSubmit}>
              <label className='h3 form-label mt-3 mb-3' htmlFor='title'>Project Name</label>
              <input required className='form-control mb-3' type="text" placeholder='Title'
              id='title' onChange={handleTitle} />
              <label className='h3 form-label mb-3' htmlFor='description'>Description</label>
              <textarea required className='form-control mb-3' placeholder='Brief description
                of this project' id='description' rows='3' onChange={handleDescription} />
              <button className='btn btn-primary float-end' type='submit'>Next</button>
            </form>
          </div>
          <div className='col' />
        </div>
      </div>
    </div>
  );
}

export default function Projects(props) {
  return (
    <div>
      <Navbar />
      <Form projectId={props.projectId} />
    </div>
  );
}
