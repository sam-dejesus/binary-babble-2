import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Homepage from './pages/Homepage';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost'
import Post from './pages/Post'
import SignUp from './pages/SignUp'



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//  const loggedIn = Boolean(localStorage.getItem('id_token'));
//   console.log('loggedIn:', loggedIn);  // For debugging

  
function App() {
const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setLoggedIn(Boolean(token));
    console.log('loggedIn:', Boolean(token));
  }, []);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout loggedIn={loggedIn} />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="editpost" element={<EditPost />} />
            <Route path="newpost" element={<NewPost />} />
            <Route path="post/:id" element={<Post loggedIn={loggedIn} />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
