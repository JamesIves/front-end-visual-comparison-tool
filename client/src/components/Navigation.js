import React, { Component, Fragment } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      selected: ''
    }
  }

  render() {
    return (
      <ul>
        <li>
          <Link to={`tests/new`}>Add Test</Link>
        </li>
        <li>
          <Link to={`/`}>Tests</Link>
        </li>
      </ul>
    )
  }
}

export default Navigation;