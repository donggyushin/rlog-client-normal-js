import React from 'react';
import styled from 'styled-components';
import CreateNewLog from './createNewLog';
import LogComponent from './log';
import { client } from 'App'
import { gql } from 'apollo-boost';
import { decodeToken } from 'utils/decodeToken';

const getMyLogs = gql`
query MyLogs(
    $userId:String!,
    $page:Int!
){
    myLogs(userId:$userId,page:$page) {
      id
      title
      image
    }
  }
`

const Container = styled.div`
    /* width:80%;
    display:flex; */
    width: 88%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    /* min-width: 1267px; */

`

class LogsComponent extends React.Component {
    state = {
        logs: [],
        page: 1
    }

    async componentDidMount() {
        const userId = decodeToken();
        const { page } = this.state;
        const response = await client.query({
            query: getMyLogs,
            variables: {
                userId,
                page
            }
        })
        const myLogs = response.data.myLogs;
        this.setState({
            logs: myLogs,
            page: this.state.page + 1
        })
    }

    render() {
        const { logs } = this.state;
        return <Container>
            <CreateNewLog />
            {logs.map((log, index) => {
                const { id, title, image } = log;
                // let previousLogId = null;
                // let nextLogId = null;
                // if (logs[index + 1]) {
                //     previousLogId = logs[index + 1].id;
                // }
                // if (logs[index - 1]) {
                //     nextLogId = logs[index - 1].id;
                // }
                return <LogComponent key={id} id={id} title={title} image={image} />
            })}
        </Container>
    }
}

export default LogsComponent