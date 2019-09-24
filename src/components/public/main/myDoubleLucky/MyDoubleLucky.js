import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    height: 100vh;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: center;
`

const PhotoContainer = styled.div`
    width:424px;
    position: relative;
    user-select:none;
`

const Photo = styled.img`
    width:100%;
    border-radius: 7px;
    user-select:none;
`

const WhiteText = styled.div`
    position:absolute;
    top:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    font-size: 32px;
    text-shadow: 7px 5px 3px rgba(7,3,2,0.56);
    user-select:none;
`

class MyDoubleLucky extends React.Component {
    render() {
        return <Container>
            <PhotoContainer>
                <Photo src={require('../../../../assets/MyDoubleLucky.jpeg')} />
                <WhiteText>
                    Hello world!
                </WhiteText>
            </PhotoContainer>
        </Container>
    }
}

export default MyDoubleLucky