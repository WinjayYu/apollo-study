const { mergeResolvers } = require('merge-graphql-schemas');
const adResolver = require('./resolvers/ad');
const userResolver = require('./resolvers/user');
const resumeResolver = require('./resolvers/resume');
const mdataResolver = require('./resolvers/mdata');

module.exports = mergeResolvers([
  adResolver,
  userResolver,
  resumeResolver,
  mdataResolver,
]);
