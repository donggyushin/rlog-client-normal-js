import React from 'react';
import styled from 'styled-components';
import CreateNewLog from './createNewLog';

const Container = styled.div`
    width:80%;
    display:flex;

`

class LogsComponent extends React.Component {
    render() {
        return <Container>
            <CreateNewLog />
        </Container>
    }
}

export default LogsComponent