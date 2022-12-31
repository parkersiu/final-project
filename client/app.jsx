import React from 'react';
import Projects from './pages/projects';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', description: '' };
  }

  render() {
    return <Projects />;
  }
}
