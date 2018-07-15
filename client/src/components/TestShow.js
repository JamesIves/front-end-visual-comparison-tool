import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { fetchTest, removeTest, runTest } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import Diff from './Diff';
import Original from './Original';
import TestMenu from './TestMenu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class TestShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)

    this.state = {
      status: ''
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
          status: 'Running...'
        })
      })
  }

  render() {
    const { test } = this.props;
    console.log(test)

    if (!test) {
      return <div>Loading...</div>
    }

    return (
      <div className={this.props.classes.root}>
        <div>{this.state.status}</div>
        <a onClick={this.onRunClick}>run test</a>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TestMenu headline={`Test: ${this.props.test.name}`} text="Click the image on the right side to view the diff overlay" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Original path={this.props.test.current} src={`/diff/live_${this.props.params.id}.png`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Diff path={this.props.test.dev} overlay={`/diff/diff_${this.props.params.id}.png`} src={`/diff/dev_${this.props.params.id}.png`} /> 
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