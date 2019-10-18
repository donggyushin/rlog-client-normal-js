import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    align-items:center;
    width: 50%;
    margin-top: 20px;
    margin-bottom: 10px;
`

const ProfilePhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

const UserName = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-right:10px;

`

const UserEmail = styled.div`
    font-weight:200;
`

const NameAndEmailContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const NameAndPhoto = ({ username, profilePhoto, userEmail }) => <Container>
    <ProfilePhoto src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} />
    <NameAndEmailContainer>
        <UserName>{username}</UserName>
        <UserEmail>{userEmail}</UserEmail>
    </NameAndEmailContainer>
</Container>

export default NameAndPhoto