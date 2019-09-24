import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    align-items: center;
    height:7vh;
    justify-content: flex-end;
    z-index:1;
    position: relative;
`

const ButtonContainer = styled.div`
    margin-right: 20px;
    width: 166px;
    display: flex;
    justify-content: space-between;
`

const SignInButton = styled.button`
    border: 0;
    font-size: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 7px;
    transition:0.7s;
    cursor: pointer;
    &:hover {
        color:white;
        background:black;
    }
`

const SignUpButton = styled.button`
    border: 0;
    font-size: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 7px;
    transition:0.7s;
    cursor: pointer;
    &:hover {
        color:white;
        background:black;
    }
`

const TitleLogo = styled.h1`
    margin-left: 33px;
    position: absolute;
    left: 20px;
    top: -2px;
    cursor: pointer;
    color:black;
`



class NavigationBar extends React.Component {
    render() {
        return <Container>
            <Link to={'/love-u'}>
                <TitleLogo>R log</TitleLogo>
            </Link>
            <ButtonContainer>
                <Link to={'/signin'}>
                    <SignInButton>Sign In</SignInButton>
                </Link>
                <Link to={'/signup'}>
                    <SignUpButton>Sign Up</SignUpButton>
                </Link>
            </ButtonContainer>
        </Container>
    }
}

export default NavigationBar