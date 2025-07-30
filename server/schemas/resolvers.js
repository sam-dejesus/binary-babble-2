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
        order: [['created_at', 'DESC']],
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
        order: [['created_at', 'DESC']],
      });
    },
  },

  Post: {
    postDateTime(post) {
      if (!post.post_date || !post.post_time) return null;

      // post_date is a Date object, post_time is string "HH:mm:ss"
      // Combine into a single ISO string:
      const datePart = post.post_date.toISOString().split('T')[0]; // "YYYY-MM-DD"
      const dateTimeString = `${datePart}T${post.post_time}`;

      // Return as Date object
      return new Date(dateTimeString);
    },
    author: async (post) => {
      return await User.findByPk(post.user_id);
    },
    createdAt: (post) => post.created_at,
    updatedAt: (post) => post.updated_at,
    comments: async (post) => {
      return await Comment.findAll({
        where: { post_id: post.id },
        order: [['created_at', 'ASC']],
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
    createdAt: (comment) => comment.created_at,
    updatedAt: (comment) => comment.updated_at,
  },
};

module.exports = resolvers;
