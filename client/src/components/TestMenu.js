import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchTest } from '../actions/index';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Dialog(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          {props.headline}
        </Typography>
        <Typography component="p">
          {props.text}
        </Typography>
      </Paper>
    </div>
  );
}

Dialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { test: state.tests.test }
}

export default withStyles(styles)(Dialog);