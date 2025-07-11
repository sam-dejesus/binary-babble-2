// src/graphql/queries.js
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
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
