import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    color:white;
    display:flex;
    justify-content:center;
`

const Box = styled.div`
    margin-top:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    color:black;
    width: 40%;
    height: 40%;
    background: white;
    border-radius: 2px;
    position: relative;
`

const Title = styled.h2``

const Message = styled.p`
    width: 80%;
`

const ButtonContainer = styled.div`
    display:flex;
    position:absolute;
    bottom:20px;
`

const Button = styled.button`
    background: white;
    border: 0;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
`

class ModalComponent extends React.Component {
    render() {
        const { title, message, noButtonClicked, okayButtonClicked } = this.props;
        return <Container>
            <Box>
                <Title>
                    {title}
                </Title>
                <Message>
                    {message}
                </Message>
                <ButtonContainer>
                    <Button onClick={okayButtonClicked}>Okay</Button>
                    <Button onClick={noButtonClicked}>No</Button>
                </ButtonContainer>
            </Box>
        </Container>
    }
}

export default ModalComponent;