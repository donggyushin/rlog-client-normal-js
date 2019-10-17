import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    align-items:center;
    width: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
`

const ProfilePhoto = styled.img`
    width: 30px;
    height: 30px;
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

const NameAndPhoto = ({ username, profilePhoto, userEmail }) => <Container>
    <ProfilePhoto src={profilePhoto} />
    <UserName>{username}</UserName>
    <UserEmail>{userEmail}</UserEmail>
</Container>

export default NameAndPhoto