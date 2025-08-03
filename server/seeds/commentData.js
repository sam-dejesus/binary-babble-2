const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great article!",
    user_id: 1,
    post_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "I disagree with you!",
    user_id: 3,
    post_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "I agree with you!",
    user_id: 4,
    post_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "I disagree with you!",
    user_id: 5,
    post_id: 1,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "Great article!",
    user_id: 1,
    post_id: 2,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 2,
    createdAt: new Date('2025-12-03T11:00:00'),
    updatedAt: new Date('2025-12-03T11:00:00')


  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
