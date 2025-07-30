const { Post } = require("../models");

const postData = [
  {
    title: "First Blog Post",
    content: "This is the content of the first blog post.",
    user_id: 1,
    post_date: '2025-12-03',
    post_time: '11:00:00',
    update_date: null
  },
  {
    title: "Second Blog Post",
    content: "This is the content of the second blog post.",
    user_id: 2,
    post_date: '2025-12-03',
    post_time: '11:00:00',
    update_date: null
  },
  {
    title: "Third Blog Post",
    content: "This is the content of the third blog post.",
    user_id: 3,
    post_date: '2025-12-03',
    post_time: '11:00:00',
    update_date: null
  },
  {
    title: "Fourth Blog Post",
    content: "This is the content of the fourth blog post.",
    user_id: 4,
    post_date: '2025-12-03',
    post_time: '11:00:00',
    update_date: null
  },
  {
    title: "Fifth Blog Post",
    content: "This is the content of the fifth blog post.",
    user_id: 5,
    post_date: '2025-12-03',
    post_time: '11:00:00',
    update_date: null
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;