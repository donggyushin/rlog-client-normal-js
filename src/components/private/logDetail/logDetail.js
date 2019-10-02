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

const getLog = gql`
query Log($id:ID!, $userId:String){
    log(id:$id, userId:$userId) {
      id,
      previousLogId
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
`

const TitleContainer = styled.div`
    width:50%;
    height:200px;
    display:flex;
    align-items:center;
    justify-content:center;
    position: relative;
`

const Title = styled.div`
    position:absolute;
    color:${props => props.image ? 'white' : 'black'};
    font-size:20px;
    font-weight:700;
`

const TitleImage = styled.img`
    width:100%;
    height:100%;
    margin-top:10px;
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
`


class LogDetail extends React.Component {

    state = {
        loading: true,
        log: {},
        blocks: []
    }

    async componentDidMount() {
        const { logId } = this.props.match.params;
        const userId = decodeToken();
        const response = await client.query({
            query: getLog,
            variables: {
                id: logId,
                userId
            }
        })
        console.log('response:', response)
        const log = response.data.log;
        if (log === null) {
            alert(`You don't have authority to access`);
            window.location.href = "/"
        }
        const blocks = response.data.log.logData.blocks;
        this.setState({
            loading: false,
            log,
            blocks
        })

    }


    render() {
        const { loading, log, blocks } = this.state;
        if (loading) {
            return <Container>Loading...</Container>
        } else {
            return <Container>
                <BackButton to={'/'} text={'logs'} />
                <TitleContainer>
                    <Title image={log.image}>{log.title}</Title>
                    {log.image && <TitleImage src={log.image} />}
                    <Date image={log.image}>{log.day} {log.month} {log.year}</Date>
                </TitleContainer>
                <BlocksContainer>
                    {blocks.map(block => {
                        return <BlockComponent key={block.id} block={block} />
                    })}
                </BlocksContainer>
                {log.previousLogId && <PreviousButton id={log.previousLogId} />}
                {log.nextLogId && <NextButton id={log.nextLogId} />}

            </Container>
        }

    }
}

export default withRouter(LogDetail)