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
      console.log(test)
      return (
        <div key={test._id}>
          <Link to={`/tests/${test._id}`}>{test.name}</Link>
        </div>
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

function mapStateToProps(state) {
  return { tests: state.tests.all }
}

export default connect(mapStateToProps, { fetchTests })(TestIndex);