import React from 'react';
import styled from 'styled-components';
import { client } from 'App'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import BlockComponent from './block';
import BackButton from '../postNewLog/backButton';
import { decodeToken } from 'utils/decodeToken'
import PreviousButton from './previousButton';
import NextButton from './nextButton';
import NameAndPhoto from './NameAndPhoto/NameAndPhoto';

const getUserNameAndProfilePhoto = gql`
query($id:ID!){
    user(id:$id) {
      name
      profilePhoto
      email
    }
  }
`

const getLog = gql`
query Log($id:ID!, $userId:String){
    log(id:$id, userId:$userId) {
      id,
      previousLogId
      userId
      nextLogId
      title,
      year,
      month,
      day,
      image,
      logData {
        blocks {
          id
          type
          data {
            meta {
                title
                description
                image {
                    url
                }
            }
            link,
            text,
            file {
              url
            },
            stretched,
            caption,
            embed,
            service,
            source,
            height,
            width,
            level,
            withBorder,
            withBackground
          }
        }
      }
    }
  }
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    padding-bottom:300px;
`

const TitleContainer = styled.div`
    width:50%;
    height:200px;
    display:flex;
    align-items:center;
    justify-content:center;
    position: relative;
    @media (max-width: 700px) {
        width:100%;   
    }
`

const Title = styled.div`
    position:absolute;
    color:${props => props.image ? 'white' : 'black'};
    font-size:20px;
    font-weight:700;
    font-family: 'Jomolhari', serif;
`

const TitleImage = styled.img`
    width:100%;
    height:100%;
    margin-top:10px;
    @media (max-width: 700px) {
        margin-top:0px;
    }
    object-fit:cover;
`

const Date = styled.div`
    position:absolute;
    right:6px;
    bottom:0px;
color:${props => props.image ? "white" : "black"};
    font-size: 12px;
    font-weight: 800;
`

const BlocksContainer = styled.div`
    width:50%;
    margin-top:70px;
    @media (max-width: 700px) {
        width:95%;   
    }
`


class LogDetail extends React.Component {

    state = {
        loading: true,
        log: {},
        blocks: [],
        k: 'private',
        username: "",
        profilePhoto: "",
        userEmail: ""
    }

    async componentDidMount() {

        const urlParams = new URLSearchParams(window.location.search);
        const k = urlParams.get('k');
        if (k) {
            this.setState({
                k
            })

        }

        const { logId } = this.props.match.params;
        const userId = decodeToken();
        const response = await client.query({
            query: getLog,
            variables: {
                id: logId,
                userId
            }
        })

        const log = response.data.log;
        if (log === null) {
            alert(`You don't have authority to access`);
            window.location.href = "/"
        }
        const logUserId = log.userId;

        const blocks = response.data.log.logData.blocks;
        client.query({
            query: getUserNameAndProfilePhoto,
            variables: {
                id: logUserId
            }
        }).then(res => {
            console.log("response: ", res)
            this.setState({
                loading: false,
                log,
                blocks,
                username: res.data.user.name,
                profilePhoto: res.data.user.profilePhoto,
                userEmail: res.data.user.email
            })
        })

    }


    render() {
        const { loading, log, blocks, k, username, profilePhoto, userEmail } = this.state;
        if (loading) {
            return <Container>Loading...</Container>
        } else {
            return <Container>
                <BackButton to={k === 'public' ? `/?k=public` : "/"} text={'logs'} />
                <TitleContainer>
                    <Title image={log.image}>{log.title}</Title>
                    {log.image && <TitleImage src={log.image} />}
                    {/* <Date image={log.image}>{log.day} {log.month} {log.year}</Date> */}
                </TitleContainer>
                <NameAndPhoto userEmail={userEmail} year={log.year} month={log.month} day={log.day} username={username} profilePhoto={profilePhoto} />
                <BlocksContainer>
                    {blocks.map(block => {
                        return <BlockComponent key={block.id} block={block} />
                    })}
                </BlocksContainer>
                {k === 'private' && <>
                    {log.previousLogId && <PreviousButton id={log.previousLogId} />}
                    {log.nextLogId && <NextButton id={log.nextLogId} />}
                </>}

            </Container>
        }

    }
}

export default withRouter(LogDetail)