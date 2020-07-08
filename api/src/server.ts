import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app: express.Application = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`));
