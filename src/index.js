import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';


const client = new ApolloClient({
  uri: `http://localhost:5000/graphql-sample-f4eef/us-central1/graphql`,
  request:  operation => {
    operation.setContext((context) => ({
      headers:{
        ...context.headers,
        authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    }))
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
