const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment]
    createdAt: DateTime
    updatedAt: DateTime
    postDateTime: DateTime  
    author: User!
  }

  type Comment {
    id: ID!
    comment_text: String!
    createdAt: String
    updatedAt: String
    author: User!
    post: Post!
  }

  type Query {
    userById(id: ID!): User
    me: User

    getPost(id: ID!): Post
    getAllPosts: [Post!]!

    getCommentsByPost(postId: ID!): [Comment!]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    createPost(title: String!, content: String!): Post
    addComment(postId: ID!, comment_text: String!): Comment

    updatePost(id: ID!, title: String!, content: String!): Post
    deletePost(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
