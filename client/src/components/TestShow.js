import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchTest, removeTest, runTest } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Diff from './Diff';
import Original from './Original';

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

class TestShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.state = {
      running: false
    }

    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRunClick = this.onRunClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchTest(this.props.params.id);
  }

  onRemoveClick() {
    this.props.removeTest(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      })
  }

  onRunClick() {
    this.props.runTest(this.props.params.id)
      .then(() => {
        this.setState({
          running: true
        })
      })
  }

  onEditClick() {
    // TODO: Handle the ability to update the test here...
  }

  render() {
    const { classes, test } = this.props;

    if (!test) {
      return <LinearProgress />
    }

    return (
      <div className={classes.root}>
        <div>{this.state.status}</div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              {test.name}
            </Typography>
            <Typography component="p">
              Showing a visual comparrison between the two pages. Clicking the image on the right side will toggle
              a pixel comparison overlay that you can use to highlight changes.
            </Typography>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Remove Test">
              <Button onClick={this.onEditClick}>Edit Test</Button>
            </Tooltip>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Once selected the test will run in the background, the page may refresh a few times.">
              <Button onClick={this.onRunClick}>Run Test</Button>
            </Tooltip>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Remove Test">
              <Button onClick={this.onRemoveClick}>Remove Test</Button>
            </Tooltip>
            </Paper>

            {this.state.running ?
              <LinearProgress />
            : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Original path={test.current} src={`/diff/live_${this.props.params.id}.png`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Diff path={test.dev} overlay={`/diff/diff_${this.props.params.id}.png`} src={`/diff/dev_${this.props.params.id}.png`} /> 
          </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { test: state.tests.test }
}

export default withStyles(styles)(connect(mapStateToProps, { fetchTest, removeTest, runTest })(TestShow));