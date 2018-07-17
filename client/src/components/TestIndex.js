import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTests } from '../actions/index';
import { Link } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  }
});

class TestIndex extends Component {
  componentWillMount() {
    this.props.fetchTests();
  }

  renderTests() {
    const { classes } = this.props
    return this.props.tests.map((test) => {
      return (
        <Grid item xs={12} sm={6} key={test._id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="headline" component="h2">
                <Link to={`/tests/${test._id}`}>{test.name}</Link>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {test.description}
                </Typography>
                <CardActions>
                  <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit the test if you've made a mistake.">
                  <Button onClick={this.onEditClick}><Link to={`/tests/${test._id}`}>View</Link></Button>
                  </Tooltip>
                  <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Once selected the test will run in the background, the page may refresh a few times.">
                    <Button onClick={this.onRunClick}>Run Test</Button>
                  </Tooltip>
                  <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Removes the test from the database.">
                    <Button onClick={this.onRemoveClick}>Remove Test</Button>
                  </Tooltip>
                </CardActions>
              </CardContent>
            </Card>
        </Grid>
      )
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.renderTests()}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tests: state.tests.all }
}

export default withStyles(styles)(connect(mapStateToProps, { fetchTests })(TestIndex));