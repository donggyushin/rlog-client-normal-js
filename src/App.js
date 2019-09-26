import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import PrivateComponent from 'components/private';
import PublicComponent from 'components/public';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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
