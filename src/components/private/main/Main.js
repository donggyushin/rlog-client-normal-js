import React from 'react';
import styled from 'styled-components';
import LogsComponent from './logs';
import NavigationBar from './navigation';

const Container = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
`

class MainComponent extends React.Component {
    render() {
        return <Container>
            <NavigationBar />
            <LogsComponent />
        </Container>
    }
}

export default MainComponent