import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.div`
    position: absolute;
    top: 1%;
    left: 2%;
    cursor: pointer;
    color:black;
`

class BackButton extends React.Component {
    render() {
        const { to } = this.props;
        return <Container>
            <Link style={{
                color: 'black',
                textDecoration: 'none'
            }} to={to}>
                back
            </Link>
        </Container>
    }
}

export default BackButton;