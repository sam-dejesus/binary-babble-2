const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    userById: async (parent, { id }) => {
      return await User.findByPk(id, { attributes: { exclude: ['password'] } });
    },

    me: async (parent, args, context) => {
      if (context.user) {
      console.log("context.user:", context.user);
      const userData = await User.findByPk(context.user.id, {
      attributes: { exclude: ['password'] },
    });
    console.log("userData from DB:", userData);
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

    createPost: async (parent, { title, content }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Post.create({
        title,
        content,
        user_id: context.user.id,
      });
    },

    addComment: async (parent, { postId, comment_text }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Comment.create({
        comment_text,
        post_id: postId,
        user_id: context.user.id,
      });
    },

    updatePost: async (parent, { id, title, content }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const post = await Post.findByPk(id);

      if (!post || post.user_id !== context.user.id) {
        throw new AuthenticationError('Not authorized to edit this post');
      }

      await post.update({ title, content });
      return post;
    },

    deletePost: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const post = await Post.findByPk(id);

      if (!post || post.user_id !== context.user.id) {
        throw new AuthenticationError('Not authorized to delete this post');
      }

      await post.destroy();
      return true;
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
