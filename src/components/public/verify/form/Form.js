import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { compose } from 'redux'

const allocateAuthKeyToUser = gql`
mutation($userId:String!) {
    allocateVerifyKeyToUser(userId:$userId) {
      id
      verifyKey
    }
  }
`

const verifyUser = gql`
mutation($userId:String!, $verifyKey:String!) {
    verifyUser(userId:$userId, verifyKey:$verifyKey) {
      verified
      id
    }
  }
`


const Container = styled.div`
    height:97vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Text = styled.div``

const Input = styled.input`
    width: 16%;
    text-align: center;
    
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    outline: none;
`

const Button = styled.button`
    font-size:13px;
`

class FormComponent extends React.Component {

    state = {
        verifyKey: ""
    }

    componentDidMount() {
        const { id } = this.props.match.params
        const { allocateAuthKeyToUser } = this.props;
        const variables = {
            userId: id
        }
        allocateAuthKeyToUser({
            variables
        }).then(res => res.data)
            .then(data => {
                return
            })
            .catch(err => {
                alert(err.message)
            })
    }

    render() {
        const { verifyKey } = this.state;
        const { handleInput, submitButtonClicked } = this;
        return <Container>
            <Text>
                We sent you the authentication key by the mobile message.
            </Text>
            <Text>
                If you can't get message, please contact me, donggyu9410gmail.com
            </Text>
            <Input onChange={handleInput} value={verifyKey} name={'verifyKey'} placeholder={'e.g) 0629'} />
            <Button onClick={submitButtonClicked}>Submit</Button>
        </Container>
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitButtonClicked = () => {
        const { verifyUser } = this.props;
        const { id } = this.props.match.params
        const { verifyKey } = this.state;
        const variables = {
            userId: id,
            verifyKey
        }
        verifyUser({
            variables
        }).then(res => res.data)
            .then(data => data.verifyUser)
            .then(verifyUser => {
                if (verifyUser.verified) {
                    window.location.href = '/signin'
                } else {
                    alert('Fail to verify user. ')
                }
            })
            .catch(err => {
                alert(err.message)
            })
    }
}

export default withRouter(compose(
    graphql(allocateAuthKeyToUser, { name: 'allocateAuthKeyToUser' }),
    graphql(verifyUser, { name: 'verifyUser' })
)(FormComponent))