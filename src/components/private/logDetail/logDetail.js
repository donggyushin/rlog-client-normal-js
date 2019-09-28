import React from 'react';
import styled from 'styled-components';
import { client } from 'App'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import BlockComponent from './block';

const getLog = gql`
query Log($id:ID!){
    log(id:$id) {
      id,
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
    color:white;
    font-size: 12px;
    font-weight: 800;
`

const BlocksContainer = styled.div`
    width:75%;
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
        const response = await client.query({
            query: getLog,
            variables: {
                id: logId
            }
        })
        console.log('response:', response)
        const log = response.data.log;
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
                <TitleContainer>
                    <Title image={log.image}>{log.title}</Title>
                    {log.image && <TitleImage src={log.image} />}
                    <Date>{log.day} {log.month} {log.year}</Date>
                </TitleContainer>
                <BlocksContainer>
                    {blocks.map(block => {
                        return <BlockComponent key={block.id} block={block} />
                    })}
                </BlocksContainer>
            </Container>
        }

    }
}

export default withRouter(LogDetail)