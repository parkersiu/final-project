import React from 'react';
import Projects from './pages/projects';
import Milestones from './pages/milestones';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'milestones' };
  }

  render() {
    if (this.state.page === 'projects') {
      return <Projects />;
    }
    if (this.state.page === 'milestones') {
      return <Milestones />;
    }
  }
}
