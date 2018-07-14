import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
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
  img: {
    maxWidth: '100%'
  }
};

class Diff extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOverlay: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      showOverlay: !this.state.showOverlay
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.props)
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            Dev
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {this.props.path}
          </Typography>
          <img className={classes.img} 
            src={this.state.showOverlay ? this.props.overlay : this.props.src} 
            onClick={this.handleClick} />
        </CardContent>
      </Card>
    )
  }
}

Diff.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Diff);