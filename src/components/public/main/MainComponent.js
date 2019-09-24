import React from 'react';
import styled from 'styled-components';
import Copyright from './copyright';
import NavigationBar from './navigation';
import MyDoubleLucky from './myDoubleLucky';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    width:100%;
    position: relative;
`


class PublicMainComponent extends React.Component {
    render() {
        return <Container>
            <NavigationBar />
            <MyDoubleLucky />
            <Copyright />
        </Container>
    }
}

export default PublicMainComponent