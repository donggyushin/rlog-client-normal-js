import React from 'react';
import styled from 'styled-components';
import LogsComponent from './logs';
import NavigationBar from './navigation';
import { gql } from 'apollo-boost'
import { client } from 'App';
import { decodeToken } from 'utils/decodeToken';
import ChangeProfilePhoto from './changeProfile';

export const getUserInfo = gql`
query($id:ID!){
    user(id:$id) {
      name
      email
      phone
      profilePhoto
    }
  }
`


const Container = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
`

class MainComponent extends React.Component {



    componentDidMount() {
        const userId = decodeToken();
        client.query({
            query: getUserInfo,
            variables: {
                id: userId
            }
        }).then(result => {
            const user = result.data.user;
            const { email, name, phone, profilePhoto } = user;
            this.setState({
                email,
                name,
                phone,
                profilePhoto
            })
        }).catch(err => console.error(err))
    }

    state = {
        name: "",
        email: "",
        phone: "",
        profilePhoto: "",
        changeProfileView: false
    }

    render() {
        const { profilePhoto, changeProfileView } = this.state;
        const { turnOnChangeProfileView, turnOffChangeProfileView, changeProfileImage } = this;
        return <Container>
            <NavigationBar turnOnChangeProfileView={turnOnChangeProfileView} profilePhoto={profilePhoto} />
            <LogsComponent />
            {changeProfileView && <ChangeProfilePhoto changeProfileImage={changeProfileImage} turnOffChangeProfileView={turnOffChangeProfileView} profilePhoto={profilePhoto} />}
        </Container>
    }

    changeProfileImage = profileImageUrl => {
        this.setState({
            profilePhoto: profileImageUrl
        })
    }

    turnOffChangeProfileView = () => {
        this.setState({
            changeProfileView: false
        })
    }

    turnOnChangeProfileView = () => {
        this.setState({
            changeProfileView: true
        })
    }
}

export default MainComponent