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
  };

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
        title={`Edit Test: ${test.name}`}
        name={test.name}
        description={test.description}
        live={test.live}
        dev={test.dev}
        size={test.size} />
    )
  }
}

function mapStateToProps(state) {
  return { 
    test: state.tests.test
  }
}

export default reduxForm({
  form: 'TestsEditForm',
  fields: ['name', 'description', 'live', 'dev', 'size'],
  validate
})(
	connect(mapStateToProps, { editTest, fetchTest })(TestEdit)
);