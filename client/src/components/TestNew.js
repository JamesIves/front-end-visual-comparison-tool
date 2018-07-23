import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTest } from '../actions/index';
import TestForm, { validate } from './TestForm';

class TestNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.addTest(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <TestForm 
        onSubmit={handleSubmit(this.onSubmit.bind(this))} 
        title="Create a Test" />
    )
  }
}

TestNew.propTypes = {
  addTest: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'TestsNewForm',
  fields: ['name', 'description', 'live', 'dev', 'size'],
  validate
})(
	connect(null, { addTest })(TestNew)
);