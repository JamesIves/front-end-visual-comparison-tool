import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Diff from './components/Diff'

export default (
	<Route path="/" component={App}>
		<Route path="/mobile" component={Diff} />
		<Route path="/tablet" component={Diff} />
		<Route path="/desktop" component={Diff} />
	</Route>
)