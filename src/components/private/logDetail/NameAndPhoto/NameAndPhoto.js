import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    align-items:center;
    width: 50%;
    margin-top: 20px;
    margin-bottom: 10px;
    position: relative;
`

const ProfilePhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

const UserName = styled.div`
    margin-right:10px;
    font-size:16px;
font-style:normal;
font-weight:300;

`

const UserEmail = styled.div`
    font-weight:200;
    font-size: 13px;
`

const NameAndEmailContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const Date = styled.div`
    position:absolute;
    bottom:6px;
    right:0px;
    
    font-size:14px;
font-style:normal;
font-weight:300;
`

const NameAndPhoto = ({ username, profilePhoto, userEmail,
    year,
    month,
    day,
}) => <Container>
        <ProfilePhoto src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} />
        <NameAndEmailContainer>
            <UserName>{username}</UserName>
            <UserEmail>{userEmail}</UserEmail>
        </NameAndEmailContainer>
        <Date>{day} {month} {year}</Date>
    </Container>

export default NameAndPhoto