import React from 'react'
import styled from 'styled-components';


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
    color:${props => props.image ? "white" : "black"};
    position:absolute;
    top:10px;
    left:10px;
    opacity:0;
    ${Container}:hover & {
        opacity:1;
        z-index:3;
    }
`

const EditIcon = styled.i`
    color:${props => props.image ? "white" : "black"};
    position:absolute;
    top:10px;
    left:36px;
    opacity:0;
    ${Container}:hover & {
        opacity:1;
        z-index:3;
    }
`


class LogComponent extends React.Component {


    render() {
        const { title, image } = this.props;
        const { trashIconClicked, LogComponentClicked, editIconClicked } = this;
        return <Container onClick={LogComponentClicked}>
            <TrashIcon image={image} onClick={trashIconClicked} className={'fas fa-trash-alt'} />
            <EditIcon onClick={editIconClicked} image={image} className={'far fa-edit'} />
            {image && <BackgroundImage src={image} />}
            <Text image={image}>{title}</Text>

        </Container>

    }

    LogComponentClicked = () => {
        const { id } = this.props;
        window.location.href = `/log/${id}`
    }

    editIconClicked = e => {
        e.stopPropagation();
        const { id } = this.props;
        window.location.href = `/edit/log/${id}`
    }

    trashIconClicked = (e) => {
        e.stopPropagation();
        const { id, turnOnModalByClickingTrashIcon, logIdToDeleteFunc } = this.props;
        turnOnModalByClickingTrashIcon()
        logIdToDeleteFunc(id)
        console.log(`${id} trash icon clicked!`)

    }

}

export default LogComponent