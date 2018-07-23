import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

const Original = props => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          Live
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.path}
        </Typography>
        <img 
          className={classes.img}
          alt="Screenshot of the live site."
          src={props.src}
          onError={(e) => {e.target.src="/error.png"}} />
      </CardContent>
    </Card>
  )
}

Original.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default withStyles(styles)(Original);