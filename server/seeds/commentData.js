const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great article!",
    user_id: 1,
    post_id: 1,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 1,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "I disagree with you!",
    user_id: 3,
    post_id: 1,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "I agree with you!",
    user_id: 4,
    post_id: 1,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "I disagree with you!",
    user_id: 5,
    post_id: 1,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "Great article!",
    user_id: 1,
    post_id: 2,
    comment_date: '2025-12-03',
    comment_time: '11:00:00',
    update_date: null

  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 2,
    pcommentdate: '2025-12-03',
    pcommenttime: '11:00:00',
    update_date: null

  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
