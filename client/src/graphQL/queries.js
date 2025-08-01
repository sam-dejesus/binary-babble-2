// src/graphql/queries.js
import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  query Me {
    me {
      id
      username
      email
      posts {
        id
        title
        content
        createdAt
      }
    }
  }
`;


export const QUERY_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      postDateTime
      content
      createdAt
      author {
        username
      }
    }
  }
`;

export const QUERY_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: ID!) {
    getCommentsByPost(postId: $postId) {
      id
      comment_text
      createdAt
      author {
        username
      }
    }
  }
`;


export const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      postDateTime
      comments {
        id
        comment_text
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`;



