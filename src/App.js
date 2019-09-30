import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import PrivateComponent from 'components/private';
import PublicComponent from 'components/public';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'

let uri = "http://localhost:4000/graphql"

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
} else {
  // production code
  uri = "http://ec2-15-164-170-141.ap-northeast-2.compute.amazonaws.com:4000/graphql"
}

export const client = new ApolloClient({
  uri
})


const Container = styled.div``

class AppContainer extends React.Component {
  state = {
    isLoggedIn: localStorage.getItem('jwt') ? true : false
  }
  render() {
    const { isLoggedIn } = this.state
    return <ApolloProvider client={client}>
      <App isLoggedIn={isLoggedIn} />
    </ApolloProvider>
  }
}



function App(props) {
  const { isLoggedIn } = props;
  return (
    <Container>
      {isLoggedIn ? <PrivateComponent /> : <PublicComponent />}
    </Container>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default AppContainer;
