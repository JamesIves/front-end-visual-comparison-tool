import React, { Fragment } from 'react';
import Navigation from './Navigation';
import withRoot from '../withRoot';

const App = props => {
  return (
    <Fragment>
      <Navigation />
      {props.children}
    </Fragment>
  );
}

export default withRoot(App);
