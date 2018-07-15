import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTests } from '../actions/index';
import { Link } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class TestIndex extends Component {
  componentWillMount() {
    this.props.fetchTests();
  }

  renderTests() {
    const { classes } = this.props
    return this.props.tests.map((test) => {
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
          <Link to={`/tests/${test._id}`}>{test.name}</Link>
          </Typography>
        </Paper>
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

export default withStyles(styles)(connect(mapStateToProps, { fetchTests })(TestIndex));