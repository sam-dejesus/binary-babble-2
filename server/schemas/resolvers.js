const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findByPk(context.user.id, {
          attributes: { exclude: ['password'] },
        });
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Fetch a single post by ID
    getPost: async (parent, { id }) => {
      return await Post.findByPk(id);
    },

    // Fetch all posts (could add pagination later)
    getAllPosts: async () => {
      return await Post.findAll({
        order: [['createdAt', 'DESC']],
      });
    },

    // Fetch comments for a specific post
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

    // Create a new post (requires logged-in user)
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

    // Add a comment to a post (requires logged-in user)
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

  Post: {
    author: async (post) => {
      return await User.findByPk(post.user_id);
    },
  },

  Comment: {
    author: async (comment) => {
      return await User.findByPk(comment.user_id);
    },
    post: async (comment) => {
      return await Post.findByPk(comment.post_id);
    },
  },
};

module.exports = resolvers;
