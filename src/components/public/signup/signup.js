import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../main/navigation';
import Copyright from '../main/copyright';
import LabelComponent from './label';
import FormComponent from './form';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { compose } from 'redux'

const loginMutation = gql`
mutation($email:String!, $password:String!) {
    login(email:$email, password:$password){
      jwt
    }
  }
`


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
        const { handleInput, submitButtonClicked } = this;
        return <Container>
            <NavigationBar />
            <LabelAndFormComponentsContainer>
                <LabelComponent email={email} password={password} />
                <FormComponent submitButtonClicked={submitButtonClicked} handleInput={handleInput} email={email} password={password} />
            </LabelAndFormComponentsContainer>
            <Copyright />
        </Container>
    }

    submitButtonClicked = () => {
        const { email, password } = this.state;
        const { loginMutation } = this.props;
        const variables = {
            email,
            password
        }
        loginMutation({
            variables
        })
            .then(res => res.data.login)
            .then(result => {
                console.log(result)
                if (result.jwt === 'Not verified') {
                    alert('Not verified account')
                } else if (result.jwt === null) {
                    alert('Check your email and password');

                } else {
                    localStorage.setItem('jwt', result.jwt)
                    window.location.href = '/'
                }
            })
            .catch(err => {
                alert(err.message)
            })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default compose(
    graphql(loginMutation, { name: 'loginMutation' })
)(SignUpComponent)