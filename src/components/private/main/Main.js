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

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('k');

        if (myParam) {
            this.setState({
                k: myParam
            })
        }

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
                profilePhoto,
                loading: false
            })
        }).catch(err => console.error(err))
    }

    state = {
        name: "",
        email: "",
        phone: "",
        profilePhoto: "",
        changeProfileView: false,
        k: "",
        loading: true
    }

    render() {
        const { profilePhoto, changeProfileView, k, loading } = this.state;
        const { turnOnChangeProfileView, turnOffChangeProfileView, changeProfileImage } = this;
        return <Container>
            {loading ? 'loading... ' : <>

                <NavigationBar turnOnChangeProfileView={turnOnChangeProfileView} profilePhoto={profilePhoto} />
                <LogsComponent k={k} />
                {changeProfileView && <ChangeProfilePhoto changeProfileImage={changeProfileImage} turnOffChangeProfileView={turnOffChangeProfileView} profilePhoto={profilePhoto} />}
            </>}
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