import React, { Component, Fragment } from 'react';
import Navigation from './Navigation';
import withRoot from '../withRoot';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: null
    }
  }

  render() {
    return (
      <Fragment>
        <Navigation />
        {this.props.children}
      </Fragment>
    );
  }
}

export default withRoot(App);
