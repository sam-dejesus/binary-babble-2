const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const DateTime = require('../utils/DateTimeScalar');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    userById: async (parent, { id }) => {
      return await User.findByPk(id, { attributes: { exclude: ['password'] } });
    },

    me: async (parent, args, context) => {
      if (context.user) {
      const userData = await User.findByPk(context.user.id, {
      attributes: { exclude: ['password'] },
    });
    return userData;
  }
  throw new AuthenticationError('Not logged in');
},

    getPost: async (parent, { id }) => {
      const post = await Post.findByPk(id);
      return post;
    },

    getAllPosts: async () => {
      return await Post.findAll({
        order: [['createdAt', 'DESC']],
      });
    },

    getCommentsByPost: async (parent, { postId }) => {
      return await Comment.findAll({
        where: { post_id: postId },
        order: [['createdAt', 'ASC']],
      });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

  
  },

  User: {
    posts: async (user) => {
      return await Post.findAll({
        where: { user_id: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
    comments: async (user) => {
      return await Comment.findAll({
      where: { user_id: user.id },
      order: [['createdAt', 'DESC']],
    });
  },
  },

  Post: {
    author: async (post) => {
      return await User.findByPk(post.user_id);
    },
    createdAt: (post) => post.createdAt,
    updatedAt: (post) => post.updatedAt,
    comments: async (post) => {
      return await Comment.findAll({
        where: { post_id: post.id },
        order: [['createdAt', 'ASC']],
      });
    }
  },

  Comment: {
    author: async (comment) => {
      return await User.findByPk(comment.user_id);
    },
    post: async (comment) => {
      return await Post.findByPk(comment.post_id);
    },
    createdAt: (comment) => comment.createdAt,
    updatedAt: (comment) => comment.updatedAt,
  },
};

module.exports = resolvers;
