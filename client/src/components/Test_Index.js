import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTests } from '../actions/index';
import { Link } from 'react-router';

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
        Tests will go here when the endpoint is ready...
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tests: state.tests.all }
}

export default connect(mapStateToProps, { fetchTests })(TestIndex);