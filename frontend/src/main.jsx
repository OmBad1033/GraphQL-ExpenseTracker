import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import GridBackground from './components/ui/GridBackground.jsx'
import App from './App.jsx'
import './index.css'

const apiUrl = import.meta.env.VITE_NODE_ENV === "development" 
  ? "http://localhost:4000/gql" 
  : "/gql";

console.log('Apollo Client URI:', apiUrl); // Debug log

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
  credentials: 'include' //this tells apollo client to include the cookie in the request to the server
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </StrictMode>
)
