import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editTest, fetchTest } from '../actions/index';
import TestForm, { validate } from './TestForm';
import LinearProgress from '@material-ui/core/LinearProgress';

class TestEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchTest(this.props.params.id);
  }

  onSubmit(props) {
    this.props.editTest(props, this.props.params.id)
      .then(() => {
        this.context.router.push(`/tests/${this.props.params.id}`);
      })
  }

  render() {
    const { test, handleSubmit } = this.props

    if (!test) {
      return <LinearProgress />
    }

    return (
      <TestForm 
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        title={`Edit Test: ${test.name}`} />
    )
  }
}

/* Initializes the Redux Form from state so we can
default the options in the form to make editing easier. */
let TestEditForm = reduxForm({
  form: 'TestEditForm',
  validate
})(TestEdit);

TestEditForm = connect(
state => ({
  test: state.tests.test,
  initialValues: state.tests.test,
}),
{ fetchTest, editTest }
)(TestEditForm);

export default TestEditForm;