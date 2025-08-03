const { Post } = require("../models");

const postData = [
  {
    title: "First Blog Post",
    content: "This is the content of the first blog post.",
    user_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-08T11:00:00')

  },
  {
    title: "Second Blog Post",
    content: "This is the content of the second blog post.",
    user_id: 2,
    createdAt: new Date('2024-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')

  },
  {
    title: "Third Blog Post",
    content: "This is the content of the third blog post.",
    user_id: 3,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')

  },
  {
    title: "Fourth Blog Post",
    content: "This is the content of the fourth blog post.",
    user_id: 4,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')

  },
  {
    title: "Fifth Blog Post",
    content: "This is the content of the fifth blog post.",
    user_id: 5,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')

  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;