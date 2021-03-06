import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTests } from '../actions/index';
import { Link } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
                <Link to={`/tests/${test._id}`} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>{test.name}</Link>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {test.description}
                </Typography>
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
          {this.props.tests.length > 0  ? 
            this.renderTests() : 
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.pos} color="textSecondary">
                    There are no tests to show. Select the 'Create Test' button from the menu or <Link to="/tests/create" style={{ textDecoration: 'none' }}>click here</Link>.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          }
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { tests: state.tests.all }
}

TestIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, { fetchTests })(TestIndex));