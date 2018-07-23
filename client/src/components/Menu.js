import React from 'react';
import { Link } from 'react-router';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

export const menu = (
  <div>
    <Link to="/create" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Test" />
      </ListItem>
    </Link>
    <Divider />
    <Link to={`/`} style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="View Tests" />
      </ListItem>
    </Link>
  </div>
);