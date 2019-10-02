import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainComponent from './main';
import PostNewLog from './postNewLog';
import LogDetail from './logDetail';
import EditLogPage from './editLogPage';

class PrivateComponent extends React.Component {
    render() {
        return <Router>
            <Switch>
                <Route path={'/'} exact component={MainComponent} />
                <Route path={'/post'} exact component={PostNewLog} />
                <Route path={'/log/:logId'} exact component={LogDetail} />
                <Route path={'/edit/log/:logId'} exact component={EditLogPage} />
                <Route component={MainComponent} />
            </Switch>
        </Router>
    }
}

export default PrivateComponent