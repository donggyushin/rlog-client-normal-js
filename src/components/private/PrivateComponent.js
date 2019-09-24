import React from 'react';
import styled from 'styled-components';

const Container = styled.div``

class PrivateComponent extends React.Component {
    render() {
        return <Container>
            Private component
        </Container>
    }
}

export default PrivateComponent