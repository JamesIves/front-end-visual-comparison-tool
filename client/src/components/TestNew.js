import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addTest } from '../actions/index';
import { Link } from 'react-router';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    minWidth: 275,
  }
});

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

  renderTextField = ({
    input,
    label,
    placeholder,
    required,
    meta: { touched, error },
    ...custom
  }) => (
    <div>
      {console.log(error)}
    <TextField
      label={touched && error ? error : label}
      placeholder={placeholder}
      error={touched && error ? true : false}
      required={required}
      {...input}
      {...custom}
    />
    </div>
  )

  render() {
    const { handleSubmit, classes } = this.props
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Card>
              <CardContent>
              <Typography variant="headline" component="h2">
                  Create a Test
                </Typography>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div>
                    <Field 
                      component="input" 
                      type="text" 
                      name="name" 
                      label="Name"
                      placeholder="The name of your test."
                      margin="normal"
                      className={classes.textField}
                      component={this.renderTextField} />
                  </div>

                  <div>
                    <Field 
                      component="input" 
                      type="text" 
                      name="description"
                      label="Description"
                      placeholedr="Describe your test."
                      margin="normal"
                      className={classes.textField}
                      component={this.renderTextField}  />
                  </div>

                  <div>
                    <Field 
                      component="input" 
                      type="text" 
                      name="live"
                      label="Live URL"
                      placeholder="The url path for your live site."
                      margin="normal"
                      className={classes.textField}
                      component={this.renderTextField} />
                  </div>

                  <div>
                    <Field 
                      component="input" 
                      type="text" 
                      name="dev"
                      label="Dev URL"
                      placeholder="The url path for your dev site."
                      margin="normal"
                      className={classes.textField}
                      component={this.renderTextField} />
                  </div>

                  <div>
                    <Field 
                      component="input" 
                      type="number" 
                      name="size"
                      placeholder="The browser width you'd like your test to run at."
                      label="Browser Size"
                      className={classes.textField}
                      component={this.renderTextField} />
                  </div>

                  <Button type="submit">Submit</Button>
                  <Link to="/" className="btn btn-danger"><Button type="submit">Cancel</Button></Link>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
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

// TODO: Add PropType requirements here.


export default withStyles(styles)(reduxForm({
  form: 'TestsNewForm',
  fields: ['name', 'description', 'live', 'dev', 'size'],
  validate
})(
	connect(null, { addTest })(TestNew)
));