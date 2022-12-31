import React from 'react';
import Navbar from '../components/navbar';
import Breadcrumb from '../components/breadcrumb';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      userId: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    function addProject(newProject) {
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      })
        .then(res => res.json())
        .catch(err => console.error('Error:', err));
    }
    const title = this.state.title;
    const description = this.state.description;
    const userId = this.state.userId;
    const newProject = { title, description, userId };
    event.preventDefault();
    addProject(newProject);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col' />
          <div className='col-6'>
            <form onSubmit={this.handleSubmit}>
              <label className='h3 form-label mt-3 mb-3' htmlFor='title'>Project Name</label>
              <input className='form-control mb-3' type="text" placeholder='Title'
              id='title' onChange={this.handleTitle} />
              <label className='h3 form-label mb-3' htmlFor='description'>Description</label>
              <textarea className='form-control mb-3' placeholder='Brief description
      of this project' id='description' rows='3' onChange={this.handleDescription} />
              <button className='btn btn-primary float-end' type='submit'>Next</button>
            </form>
          </div>
          <div className='col' />
        </div>
      </div>
    );
  }
}

export default function Projects(props) {
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <Form />
    </div>
  );
}
