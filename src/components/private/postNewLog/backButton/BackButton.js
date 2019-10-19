import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.div`
@media (max-width: 700px) {
        position:fixed;
        bottom:20px;
        left:20px;
        display:flex;
        align-items:flex-end;
    }
    font-size:20px;
    font-weight:700;
    font-family: 'Jomolhari', serif;
    position: absolute;
    top: 1%;
    left: 2%;
    /* position:fixed;
        bottom:20px;
        left:20px; */
    cursor: pointer;
    color:black;
    z-index:2;
    
`

class BackButton extends React.Component {
    render() {
        const { to, text } = this.props;
        return <Container>
            <Link style={{
                color: 'black',
                textDecoration: 'none'
            }} to={to}>
                {text ? text : "back"}
            </Link>
        </Container>
    }
}

export default BackButton;