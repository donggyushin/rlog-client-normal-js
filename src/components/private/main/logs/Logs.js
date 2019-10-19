import React from 'react';
import styled from 'styled-components';
import CreateNewLog from './createNewLog';
import LogComponent from './log';
import { client } from 'App'
import { gql } from 'apollo-boost';
import { decodeToken } from 'utils/decodeToken';
import ModalComponent from 'components/global/Modal';
import LoadingComponent from 'components/global/loadingComponent';

const getAllPublicLogs = gql`
  query($page:Int!){
    getAllPublicLogs(page:$page){
        id
        title
        image
        private2
        year
        month
        day
        userId
    }
  }
`

const getAllPublicLogsLength = gql`
  {
    getAllPublicLogsLength{
      length
    }
  }
`

const getMyLogsLength = gql`
query($userId:String!){
  getMyLogsLength(userId:$userId) {
      length
    }
  }
`

const deleteALog = gql`
mutation($logId:String!, $userId:String!) {
    deleteALogV2(logId:$logId,userId:$userId) {
      id
      title
    }
  }
`

const getMyLogs = gql`
query MyLogs(
    $userId:String!,
    $page:Int!
){
    myLogs(userId:$userId,page:$page) {
      id
      title
      image
      private2
      year
      month
      day
      userId
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

    @media (max-width: 700px) {
        justify-content:center;
    }

`

class LogsComponent extends React.Component {
    state = {
        logs: [],
        page: 1,
        modal: false,
        modalTitle: "",
        modalMessage: "",
        logIdToDelete: "",
        loadingComponent: false,
        totalLogsLength: 0,
        loading: true,
        currentLogsLength: 0,
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    async componentDidMount() {

        // To detect users scrolls to bottom of div with React js
        document.addEventListener('scroll', this.trackScrolling);

        const { k } = this.props;
        if (k === 'public') {
            // Get all logs except for private logs

            // Get all public data length from server; 
            const lengthData = await client.query({
                query: getAllPublicLogsLength
            })
            const totalLogsLength = lengthData.data.getAllPublicLogsLength.length;
            const { page } = this.state;
            // get all pulblic logs by 50
            const response = await client.query({
                query: getAllPublicLogs,
                variables: {
                    page
                }
            })
            const allPublicLogs = response.data.getAllPublicLogs;
            const currentLogsLength = response.data.getAllPublicLogs.length;

            console.log('all public logs: ', allPublicLogs)
            this.setState({
                logs: allPublicLogs,
                page: this.state.page + 1,
                totalLogsLength,
                loading: false,
                currentLogsLength
            })
        } else {
            const userId = decodeToken();

            const lengthData = await client.query({
                query: getMyLogsLength,
                variables: {
                    userId
                }
            })
            const totalLogsLength = lengthData.data.getMyLogsLength.length
            const { page } = this.state;
            const response = await client.query({
                query: getMyLogs,
                variables: {
                    userId,
                    page
                }
            })
            const myLogs = response.data.myLogs;
            const currentLogsLength = response.data.myLogs.length;
            this.setState({
                logs: myLogs,
                page: this.state.page + 1,
                totalLogsLength,
                loading: false,
                currentLogsLength
            })
        }




    }

    render() {
        const { logs, modal, modalMessage, modalTitle, loadingComponent, loading } = this.state;
        const { turnOnModalByClickingTrashIcon, okayButtonClicked, noButtonClicked, logIdToDeleteFunc } = this;
        const { k } = this.props;
        if (loading) {
            return "Loading...."
        } else {
            return <Container id={'logsContainer'}>
                {k !== 'public' && <CreateNewLog />}

                {logs.map((log, index) => {
                    const { id, title, image, private2, year, month, day, userId } = log;

                    return <LogComponent userId={userId} year={year} month={month} day={day} private2={private2} logIdToDeleteFunc={logIdToDeleteFunc} turnOnModalByClickingTrashIcon={turnOnModalByClickingTrashIcon} key={id} id={id} title={title} image={image} />
                })}
                {loadingComponent && <LoadingComponent />}
                {modal && <ModalComponent okayButtonClicked={okayButtonClicked} noButtonClicked={noButtonClicked} title={modalTitle} message={modalMessage} />}
            </Container>
        }
    }

    isBottom(el) {

        return parseInt(el.getBoundingClientRect().bottom) <= window.innerHeight;
    }

    trackScrolling = async () => {
        const wrappedElement = document.getElementById('logsContainer');
        const { page, currentLogsLength, totalLogsLength } = this.state;
        const { k } = this.props;

        const userId = decodeToken();

        if (this.isBottom(wrappedElement)) {
            // I have to check there left more logs in database
            // I have to know how many logs now I have right now,

            // then I have to know how many logs I have in my server
            // Only procceed when there left more logs than I get right now.
            if (currentLogsLength < totalLogsLength) {

                if (k === 'public') {
                    console.log('logs container bottom reached in public logs');
                    const newPublicLogsResponse = await client.query({
                        query: getAllPublicLogs,
                        variables: {
                            page
                        }
                    })
                    const newPublicLogs = newPublicLogsResponse.data.getAllPublicLogs;
                    const newPublicLogsLength = newPublicLogs.length;
                    this.setState({
                        logs: [
                            ...this.state.logs,
                            newPublicLogs
                        ],
                        page: this.state.page + 1,
                        currentLogsLength: this.state.currentLogsLength + newPublicLogsLength
                    })
                } else {

                    console.log('logs container bottom reached in private logs');
                    const newQueryResponse = await client.query({
                        query: getMyLogs,
                        variables: {
                            userId,
                            page
                        }
                    })
                    const newMyLogs = newQueryResponse.data.myLogs;
                    const newMyLogsLength = newQueryResponse.data.myLogs.length;
                    this.setState({
                        logs: [
                            ...this.state.logs,
                            newMyLogs
                        ],
                        page: this.state.page + 1,
                        currentLogsLength: this.state.currentLogsLength + newMyLogsLength
                    })
                }



            }

        }
    }

    turnOnModalByClickingTrashIcon = () => {
        this.setState({
            modal: true,
            modalTitle: "Caution",
            modalMessage: "If you delete this log, you will never retrieve this log. Are you sure delete this log?"
        })
    }

    okayButtonClicked = async () => {
        console.log('okay button clicked!')
        this.setState({
            loadingComponent: true
        })
        const { logIdToDelete } = this.state;
        const userId = decodeToken();
        const response = await client.mutate({
            mutation: deleteALog,
            variables: {
                logId: logIdToDelete,
                userId
            }
        })

        const updatedLogs = this.state.logs.filter(log => log.id !== logIdToDelete)
        this.setState({
            logs: updatedLogs
        })


        console.log('response: ', response)
        this.setState({
            loadingComponent: false,
            modal: false,
            modalTitle: "",
            modalMessage: ""
        })
    }

    noButtonClicked = () => {
        console.log('no button clicked!')
        this.setState({
            modal: false,
            modalTitle: "",
            modalMessage: ""
        })
    }

    logIdToDeleteFunc = (logId) => {
        this.setState({
            logIdToDelete: logId
        })
    }

}

export default LogsComponent