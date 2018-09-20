import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import ItemListWrapper from './components/ItemListWrapper';
import config from './config';


const httpLink = new HttpLink({ uri: config.httpApiEndpoint});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ItemListWrapper/>
      </ApolloProvider>
    );
  }
}
