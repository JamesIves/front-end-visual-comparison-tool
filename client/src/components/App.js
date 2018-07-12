import React, { Component } from 'react';
import Diff from './Diff';
import Original from './Original';
import Navigation from './Navigation';
import Filter from './Filter';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api.json').then((response) => {
      return response.json()
    }).then((response) => {
      this.setState({
        tests: response
      })
    })
  }

  render() {
    console.log(this.state.tests)
    return (
      <div className="App">
        <Navigation items={this.state.tests} >
          <Filter>
            <Original src='http://localhost:3000/diff/homepage/728/live.png' />
            <Diff src='http://localhost:3000/diff/homepage/728/dev.png' overlay='http://localhost:3000/diff/homepage/728/diff.png' />   
          </Filter>
        </Navigation>
      </div>
    );
  }
}

export default App;
