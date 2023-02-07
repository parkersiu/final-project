import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import PageTitle from '../components/pagetitle';
import ProjectCards from '../components/project-cards';
import SignedOut from '../components/signed-out';

function Projects(props) {
  const [pageTitle] = useState('Projects List');
  const [projects, setProjects] = useState();
  const [projectsLoading, setProjectsLoading] = useState(true);
  const { userId } = props;

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
    if (userId) {
      loadProjects();
    }
  }, [userId]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      {userId
        ? <ProjectCards projects={projects} projectsLoading={projectsLoading} />
        : <SignedOut />
      }
    </>
  );
}

export default function ProjectsList(props) {
  return (
    <div>
      <Navbar setUser={props.setUser} />
      <Projects userId={props.userId} />
    </div>
  );
}
