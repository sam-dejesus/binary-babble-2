const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ API server running on port ${PORT}!`);
    console.log(`🚀 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to database:', err);
});

  };
  
// Call the async function to start the server
  startApolloServer();
