import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchTest, removeTest, runTest } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Diff from './Diff';
import Original from './Original';

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class TestShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.state = {
      running: false,
      snackbar: false,
      error: ''
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
    this.props.runTest(this.props.params.id).then((result) => {
      if (!this.props.testValidation[0].success && this.state.running) {
        this.setState({
          running: false,
          snackbar: true,
          error: 'There was an issue running the test, please edit the test and try again.'
        })
      }
    })

    this.setState({
      running: true,
      snackbar: false,
      error: ''
    })
  }

  onEditClick() {
    // TODO: Handle the ability to update the test here...
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbar: false });
  }

  render() {
    const { classes, test } = this.props;

    if (!test) {
      return <LinearProgress />
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
        {this.state.error ?
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbar}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.error}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackbarClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        : null }
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="headline" component="h2">
                  {test.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {test.description}
                </Typography>
                <Typography component="p">
                Showing a visual comparrison between the two pages. Clicking the image on the right side will toggle
                a pixel comparison overlay that you can use to highlight changes.
                </Typography>
              </CardContent>
              <CardActions>
              <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit the test if you've made a mistake.">
                <Button onClick={this.onEditClick}>Edit Test</Button>
                </Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Once selected the test will run in the background, the page may refresh a few times.">
                  <Button onClick={this.onRunClick}>Run Test</Button>
                </Tooltip>
                <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Removes the test from the database.">
                  <Button onClick={this.onRemoveClick}>Remove Test</Button>
                </Tooltip>
              </CardActions>
            </Card>

            {this.state.running ?
              <LinearProgress />
            : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Original path={test.live} src={`/diff/live_${this.props.params.id}.png`} />
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
  return { 
    test: state.tests.test,
    testValidation: state.tests.testValidation
  }
}

export default withStyles(styles)(connect(mapStateToProps, { fetchTest, removeTest, runTest })(TestShow));