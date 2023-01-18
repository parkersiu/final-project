import React from 'react';
import Projects from './pages/projects';
import Milestones from './pages/milestones';
import View from './pages/view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'view' };
  }

  render() {
    if (this.state.page === 'projects') {
      return <Projects />;
    }
    if (this.state.page === 'milestones') {
      return <Milestones />;
    }
    if (this.state.page === 'view') {
      return <View />;
    }
  }
}
