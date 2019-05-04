import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

import viewForm from '../components/pages/viewForm';
import NoMatch from '../components/pages/NoMatch';


const history = createBrowserHistory();
const Routes = () => (
    <div>
        <BrowserRouter hisotry={history}>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/viewform" />)} />
                <Route path="/viewform" component= {viewForm} />
                <Route component={NoMatch} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default Routes

  