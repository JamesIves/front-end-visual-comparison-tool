import React, { Component } from 'react';
import './App.css';
import Diff from './Diff';
import Original from './Original';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Original src='http://localhost:3000/diff/homepage/728/live.png' />
        <Diff src='http://localhost:3000/diff/homepage/728/dev.png' overlay='http://localhost:3000/diff/homepage/728/diff.png' />
      </div>
    );
  }
}

export default App;
