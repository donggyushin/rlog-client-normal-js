import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    left:0;
    height:100%;
    width:61px;
    background: rgb(244,243,247);
    background: linear-gradient(270deg, white 0%, rgba(220,220,232,1) 55%, rgba(147,147,154,1) 100%);
    padding-right:25px;
    padding-left:25px;
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:0;
    &:hover {
        opacity:0.9;
    }
    cursor: pointer;
    transition:0.3s;
`

class NextButton extends React.Component {
    render() {
        const { buttonClicked } = this;
        return <Container onClick={buttonClicked}>
            next
        </Container>
    }
    buttonClicked = () => {
        const { id } = this.props;
        window.location.href = `/log/${id}`
    }
}

export default NextButton;