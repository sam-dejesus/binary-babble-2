const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');

const resolvers = {
Query: {},
Mutation: {
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
}
}
module.exports = resolvers