import React from 'react';
import Projects from './pages/projects';
import Milestones from './pages/milestones';
import View from './pages/view';
import NotFound from './pages/not-found';
import About from './pages/about';
import ProjectsList from './pages/projects-list';
import { parseRoute } from './lib/';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      pageTitle: '',
      userId: null
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(userId) {
    this.setState({ userId });
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash),
        projectId: this.state.route.params.get('projectId')
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Projects setUser={this.setUser} userId={this.state.userId} />;
    }
    if (route.path === 'milestones') {
      const projectId = route.params.get('projectId');
      return <Milestones projectId={projectId} setUser={this.setUser} userId={this.state.userId} />;
    }
    if (route.path === 'view') {
      const projectId = route.params.get('projectId');
      return <View projectId={projectId} setUser={this.setUser} userId={this.state.userId} />;
    }
    if (route.path === 'about') {
      return <About userId={this.state.userId} setUser={this.setUser} />;
    }
    if (route.path === 'projects') {
      return <ProjectsList userId={this.state.userId} setUser={this.setUser} />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
