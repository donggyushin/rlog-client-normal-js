import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Container = styled.div`
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

class CreateNewLog extends React.Component {
    render() {
        return <Link style={{ textDecoration: 'none' }} to={'/post'}>
            <Container>
                create new log
        </Container>
        </Link>
    }
}

export default CreateNewLog