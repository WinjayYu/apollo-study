const { importSchema } = require('graphql-import');
const { mergeTypes } = require('merge-graphql-schemas');

module.exports = mergeTypes([
  importSchema('./schema/graphqls/ad.graphql'),
  importSchema('./schema/graphqls/user.graphql'),
  importSchema('./schema/graphqls/resume.graphql'),
  importSchema('./schema/graphqls/mdata.graphql'),
], { all: true });
