import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';


import SplahPage from './components/SplahPage/SplahPage';
import WaitingPage from './components/WaitingPage/WaitingPage';

  const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={SplahPage} />
            <Route exact path="/Waiting" component={WaitingPage} />
            <Route exact path="/App" component={App} />
        </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
