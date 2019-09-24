import React from 'react'
import styled from 'styled-components';
import NavigationBar from '../main/navigation';
import Copyright from '../main/copyright';
import LabelComponent from './label';
import FormComponent from './form';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    min-height:100vh;
`
const SignInComponentsContainer = styled.div`
    height:93vh;
    display:flex;
`


class SignInComponent extends React.Component {
    state = {
        name: "",
        password: "",
        checkPassword: "",
        phone: "",
        email: ""
    }
    render() {
        const { name, password, checkPassword, phone, email } = this.state;
        const { handleInput } = this;
        return <Container>
            <NavigationBar />
            <SignInComponentsContainer>
                <LabelComponent
                    name={name}
                    password={password}
                    checkPassword={checkPassword}
                    phone={phone}
                    email={email}
                />
                <FormComponent
                    name={name}
                    password={password}
                    checkPassword={checkPassword}
                    phone={phone}
                    email={email}
                    handleInput={handleInput}
                />
            </SignInComponentsContainer>
            <Copyright />
        </Container>
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default SignInComponent