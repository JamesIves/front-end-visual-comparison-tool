import React, { Component } from 'react';
import Navigation from './Navigation';
import { subscribeToTimer } from './../api';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: null
    }
  }

  componentDidMount() {
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp 
    }));
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
