import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import Heroes from './components/Heroes';
import Hero from './components/Hero';

const client = new ApolloClient({
  uri: '/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className='heroes_container'>
          <Route exact path='/' component={Heroes} />
          <Route exact path='/heroes/:id' component={Hero} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
