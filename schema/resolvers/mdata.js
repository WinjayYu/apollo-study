module.exports = {
  Node: {
    __resolveType (obj, ctx, info) {
      return obj.__typename
    }
  }
};
