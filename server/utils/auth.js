const jwt = require('jsonwebtoken');

// change secret before publishing
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
 authMiddleware: function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return { user: data };
  } catch {
    console.log('Invalid token');
    return { user: null };
  }
},
  signToken: function ({ username, email, id }) {
    const payload = { username, email, id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
