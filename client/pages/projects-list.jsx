import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import PageTitle from '../components/pagetitle';

function Projects(props) {
  const [pageTitle] = useState('Projects List');
  const [userId] = useState(25);
  const [setProjects] = useState();

  const getProject = userId => {
    fetch(`api/projects/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    const loadProjects = async () => {
      await getProject(userId);
    };
    loadProjects();
  }, [userId]);

  return (
    <PageTitle page={pageTitle} />
  );
}

export default function ProjectsList(props) {
  return (
    <div>
      <Navbar />
      <Projects />
    </div>
  );
}
