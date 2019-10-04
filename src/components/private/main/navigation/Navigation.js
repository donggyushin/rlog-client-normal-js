import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const TitleText = styled.div`
    font-size: 21px;
    font-weight: 200;
    cursor: pointer;
`

const NormalText = styled.div`
    cursor: pointer;
`

const ProfilePhoto = styled.img`
    height:40px;
    width:40px;
    border-radius:50%;
    position:absolute;
    top:1px;
    right:10px;
    cursor: pointer;
`

class Navigation extends React.Component {
    render() {
        const { logoutButtonClicked } = this;
        const { profilePhoto, turnOnChangeProfileView } = this.props;
        return <Container>
            <TitleText>R log</TitleText>
            <NormalText>
                profile
            </NormalText>
            <NormalText onClick={logoutButtonClicked}>
                logout
            </NormalText>
            <ProfilePhoto onClick={turnOnChangeProfileView} src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} />
        </Container>
    }

    logoutButtonClicked = () => {
        localStorage.removeItem('jwt')
        window.location.href = '/'
    }
}

export default Navigation