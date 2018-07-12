import React, { Component } from 'react';
import Navigation from './Navigation';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: null
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default App;
