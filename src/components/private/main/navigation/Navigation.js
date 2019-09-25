import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const TitleText = styled.div`
    font-size: 21px;
    font-weight: 200;
    cursor: pointer;
`

const NormalText = styled.div`
    cursor: pointer;
`

class Navigation extends React.Component {
    render() {
        const { logoutButtonClicked } = this;
        return <Container>
            <TitleText>R log</TitleText>
            <NormalText>
                profile
            </NormalText>
            <NormalText onClick={logoutButtonClicked}>
                logout
            </NormalText>
        </Container>
    }

    logoutButtonClicked = () => {
        localStorage.removeItem('jwt')
        window.location.href = '/'
    }
}

export default Navigation