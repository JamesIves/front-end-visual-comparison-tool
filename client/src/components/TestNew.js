import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { addTest } from '../actions/index';
import { Link } from 'react-router';
import { verifyPath } from './../api';


class TestNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.addTest(props)
      .then(() => {
        // TODO: The action creator should verify the HTTP
        // response code of the live and production stuff...
        this.context.router.push('/');
      })
  }

  render() {
    const { fields: {name, current, dev}, handleSubmit} = this.props;
    console.log(name)

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Test</h3>
        <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
          <label>Name</label>
          <input type="text" className="form-control" {...name} />
          <div className="text-help">
            {name.touched ? name.error : ''}
          </div>
        </div>

        <div className={`form-group ${current.touched && current.invalid ? 'has-danger' : ''}`}>
          <label>Current</label>
          <input type="text" className="form-control" {...current} />
          <div className="text-help">
            {current.touched ? current.error : ''}
          </div>
        </div>

        <div className={`form-group ${dev.touched && dev.invalid ? 'has-danger' : ''}`}>
          <label>Dev</label>
          <textarea className="form-control" {...dev} />
          <div className="text-help">
            {dev.touched ? dev.error : ''}
          </div>
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

  if (!values.current) {
    errors.current = 'You must enter a URL for the current page to make a comparrison from...'
  };

  if (!values.dev) {
    errors.dev = 'You must enter a URL for the new page to make a comparrison to/from...'
  };

  return errors;
}

export default reduxForm({
  form: 'TestsNewForm',
  fields: ['name', 'current', 'dev'],
  validate
}, null, { addTest })(TestNew);