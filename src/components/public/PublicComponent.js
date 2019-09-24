import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PublicMainComponent from './main';


class PublicComponent extends React.Component {
    render() {
        return <Router>
            <Switch>
                <Route path={"/"} exact component={PublicMainComponent} />
                <Route component={PublicMainComponent} />
            </Switch>
        </Router>
    }
}

export default PublicComponent