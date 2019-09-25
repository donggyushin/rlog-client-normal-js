import React from 'react';
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

const LabelAndFormComponentsContainer = styled.div`
    height:93vh;
    display:flex;
`

class SignUpComponent extends React.Component {
    state = {
        email: "",
        password: ""
    }
    render() {
        const { email, password } = this.state
        const { handleInput } = this;
        return <Container>
            <NavigationBar />
            <LabelAndFormComponentsContainer>
                <LabelComponent email={email} password={password} />
                <FormComponent handleInput={handleInput} email={email} password={password} />
            </LabelAndFormComponentsContainer>
            <Copyright />
        </Container>
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default SignUpComponent