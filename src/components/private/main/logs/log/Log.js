import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'

const deleteALog = gql`
mutation($logId:String!, $userId:String!) {
    deleteALogV2(logId:$logId,userId:$userId) {
      id
      title
    }
  }
`

const Container = styled.div`
overflow:hidden;
position: relative;
width: 265px;
height: 204px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 4px;
margin-left: 25px;
margin-right: 25px;
margin-top: 20px;
margin-bottom: 20px;
background:#dfe6e9;
box-shadow: 0px 0px 5px -1px rgba(0,0,0,0.63);
cursor: pointer;
transition:0.3s;
color:black;
&:hover {
    background:#f5f6fa;
}
text-decoration:none;
`
const BackgroundImage = styled.img`
    object-fit:cover;
    width:100%;
    height:100%;
    ${Container}:hover & {
        opacity:0.7;
    }  
`

const Text = styled.div`
    
    font-weight:600;
    position: absolute;
    color:${props => props.image ? 'white' : 'black'};
`

const TrashIcon = styled.i`
    color:white;
    position:absolute;
    top:10px;
    left:10px;
    opacity:0;
    ${Container}:hover & {
        opacity:1;
        z-index:3;
    }
`


class LogComponent extends React.Component {

    render() {
        const { title, image } = this.props;
        const { trashIconClicked, LogComponentClicked } = this;
        return <Container onClick={LogComponentClicked}>
            <TrashIcon onClick={trashIconClicked} className={'fas fa-trash-alt'} />
            {image && <BackgroundImage src={image} />}
            <Text image={image}>{title}</Text>
        </Container>

    }

    LogComponentClicked = () => {
        const { id } = this.props;
        window.location.href = `/log/${id}`
    }

    trashIconClicked = (e) => {
        e.stopPropagation();
        const { id } = this.props;
        console.log(`${id} trash icon clicked!`)

    }

}

export default LogComponent