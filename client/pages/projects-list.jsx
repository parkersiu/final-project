import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import PageTitle from '../components/pagetitle';
import ProjectCards from '../components/project-cards';

function Projects(props) {
  const [pageTitle] = useState('Projects List');
  const [userId] = useState(25);
  const [projects, setProjects] = useState();
  const [projectsLoading, setProjectsLoading] = useState(true);

  const getProject = userId => {
    setProjectsLoading(true);
    fetch(`api/projects/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    const loadProjects = async () => {
      await getProject(userId);
    };
    loadProjects();
  }, [userId]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <ProjectCards projects={projects} projectsLoading={projectsLoading} />
    </>
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
