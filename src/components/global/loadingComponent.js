import React from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

const Container = styled.div`
    position:absolute;
    z-index:10;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,0.5);
`

const LoadingComponent = () => <Container>
    <Loader
        type="Audio"
        color="#d63031"
        height={100}
        width={100}
    // timeout={3000} //3 secs

    />
</Container>

export default LoadingComponent