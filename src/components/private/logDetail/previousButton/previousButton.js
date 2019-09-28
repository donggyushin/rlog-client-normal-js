import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    right:0;
    height:100%;
    background: rgb(244,243,247);
    background: linear-gradient(90deg, white 0%, rgba(220,220,232,1) 55%, rgba(147,147,154,1) 100%);
    padding-right:25px;
    padding-left:25px;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0;
    color:black;
    &:hover {
        opacity:0.9;
    }
    cursor: pointer;
    transition:0.3s;
`

class PreviousButton extends React.Component {
    render() {
        const { buttonClicked } = this
        return <Container onClick={buttonClicked}>
            previous
</Container>


    }

    buttonClicked = () => {
        const { id } = this.props;
        window.location.href = `/log/${id}`
    }
}

export default PreviousButton;