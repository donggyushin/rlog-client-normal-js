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

const TitleLogo = styled.h1`
    margin-left: 33px;
    margin-top: -27px;
`

class PublicMainComponent extends React.Component {
    render() {
        return <Container>
            <NavigationBar />
            <TitleLogo>R log</TitleLogo>
            <MyDoubleLucky />
            <Copyright />
        </Container>
    }
}

export default PublicMainComponent