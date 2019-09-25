import React from 'react'
import styled from 'styled-components';
import NavigationBar from '../main/navigation';
import Copyright from '../main/copyright';
import FormComponent from './form';

const Container = styled.div``

class Verify extends React.Component {
    render() {
        return <Container>
            <NavigationBar />
            <FormComponent />
            <Copyright />
        </Container>
    }


}

export default Verify