import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
    user-select:none;
`

class Copyright extends React.Component {
    render() {
        return <Container>
            © 2019- shin donggyu All Rights Reserved
        </Container>
    }
}

export default Copyright