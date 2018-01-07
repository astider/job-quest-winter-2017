import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoListWithData from './components/TodoListWithData'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Todo Quest</h2>
          </div>
          <TodoListWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
