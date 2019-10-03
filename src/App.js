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
  uri = "https://www.rlog.link:4000/graphql"
}

export const client = new ApolloClient({
  uri
})

const AlphaTestVersion = styled.div`
  position:absolute;
  top:5px;
  left:5px;
`


const Container = styled.div``

class AppContainer extends React.Component {
  state = {
    isLoggedIn: localStorage.getItem('jwt') === null ? false : true
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
      <AlphaTestVersion>
        alpha test version.
      </AlphaTestVersion>
      {isLoggedIn ? <PrivateComponent /> : <PublicComponent />}
    </Container>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default AppContainer;
