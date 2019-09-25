import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PublicMainComponent from './main';
import SignInComponent from './signin';
import SignUpComponent from './signup';
import VerifyComponent from './verify';


class PublicComponent extends React.Component {
    render() {
        return <Router>
            <Switch>
                <Route path={"/"} exact component={PublicMainComponent} />
                <Route path={'/signin'} exact component={SignUpComponent} />
                <Route path={'/signup'} exact component={SignInComponent} />
                <Route path={'/verify/:id'} exact component={VerifyComponent} />
                <Route component={PublicMainComponent} />
            </Switch>
        </Router>
    }
}

export default PublicComponent