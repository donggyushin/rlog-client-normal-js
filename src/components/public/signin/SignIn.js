import React from 'react'
import styled from 'styled-components';
import NavigationBar from '../main/navigation';
import Copyright from '../main/copyright';
import LabelComponent from './label';
import FormComponent from './form';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { compose } from 'redux'

const addNewUserMutation = gql`
mutation($name:String!, $email:String!, $phone:String!, $password:String!) {
    addNewUser(name:$name, email:$email, phone:$phone, password:$password) {
      id
      name
      email
      phone
      verified
    }
  }
`

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
        const { handleInput, submitButtonClicked } = this;
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
                    submitButtonClicked={submitButtonClicked}
                />
            </SignInComponentsContainer>
            <Copyright />
        </Container>
    }

    submitButtonClicked = () => {
        const { name, email, password, checkPassword, phone } = this.state;
        const { addNewUserMutation } = this.props;
        if (name === "" || email === "" || password === "" || checkPassword === "" || phone === "") {
            alert('Please fill every form.')
            return;
        }
        const phoneLength = phone.length
        if (phoneLength !== 11) {
            alert('Please check your phone number again. ')
            return;
        }

        if (password !== checkPassword) {
            alert('Double check your password. ')
            return
        }

        const variables = {
            name,
            email,
            password,
            phone
        }

        console.log('here1')

        addNewUserMutation({
            variables
        }).then(res => {
            console.log(res)
            return res.data
        })
            .then(data => {
                console.log(data)
                return data.addNewUser
            })
            .then(user => {
                const { id } = user;
                window.location.href = `/signin`
                // window.location.href = `/verify/${id}`
            })
            .catch(err => {
                console.error(err.message)
                alert('Duplicated phone number or email.')
            })

        console.log('here2')

        this.setState({
            name: "",
            password: "",
            checkPassword: "",
            phone: "",
            email: ""
        })

    }


    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default compose(
    graphql(addNewUserMutation, { name: 'addNewUserMutation' })
)(SignInComponent)