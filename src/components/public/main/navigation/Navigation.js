import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: flex-end;
    z-index:1;
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

class NavigationBar extends React.Component {
    render() {
        return <Container>
            <ButtonContainer>
                <SignInButton>Sign In</SignInButton>
                <SignUpButton>Sign Up</SignUpButton>
            </ButtonContainer>
        </Container>
    }
}

export default NavigationBar