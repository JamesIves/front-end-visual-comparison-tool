import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTest } from '../actions/index';
import { Link } from 'react-router';


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

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Test</h3>
        <div className={`form-group`}>
          <label>Name</label>
          <Field component="input" type="name" name="name" className="form-control" />
        </div>

        <div className={`form-group`}>
          <label>Description</label>
          <Field component="input" type="description" name="description" className="form-control" />
        </div>

        <div className={`form-group`}>
          <label>Live</label>
          <Field component="input" type="live" name="live" className="form-control" />
        </div>

        <div className={`form-group`}>
          <label>Dev</label>
          <Field component="input" type="dev" name="dev" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a name for your test...'
  };

  if (!values.live) {
    errors.live = 'You must enter a URL for the current page to make a comparrison from...'
  };

  if (!values.dev) {
    errors.dev = 'You must enter a URL for the new page to make a comparrison to/from...'
  };

  return errors;
}


export default reduxForm({
  form: 'TestsNewForm',
  fields: ['name', 'description', 'live', 'dev'],
  validate
})(
	connect(null, { addTest })(TestNew)
);