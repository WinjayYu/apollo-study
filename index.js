// todo 需要全部字段
// todo 输出meta的碎片
// todo 分页

const Koa = require('koa');
const { ApolloServer } = require("apollo-server-koa");
const typeDefs = require("./schema/typedefs");
const resolvers = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`),
);
