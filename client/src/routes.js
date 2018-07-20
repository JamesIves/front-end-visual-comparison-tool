import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TestIndex from './components/TestIndex';
import TestNew from './components/TestNew';
import TestShow from './components/TestShow';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={TestIndex} />
		<Route path="tests/create" component={TestNew} />
		<Route path="tests/:id" component={TestShow} />
		<Route path="tests/:id/edit" component={TestNew} />
	</Route>
)