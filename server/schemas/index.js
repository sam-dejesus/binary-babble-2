const merge = require('lodash.merge');
const typeDefs = require('./typeDefs');
const resolvers1 = require('./resolvers');
const resolvers2 = require('./userInputResolver');

const resolvers = merge({}, resolvers1, resolvers2);

module.exports = { typeDefs, resolvers };
