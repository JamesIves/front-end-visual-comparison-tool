import React, { Component } from 'react';

class TestIndex extends Component {
  componentWillMount() {
    this.props.fetchTests();
  }

  renderTests() {
    return this.props.tests.map((test) => {
      return (
        <div>a test</div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderTests()}
      </div>
    )
  }
}

export default TestIndex