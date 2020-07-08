import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import ExchangeRatesDataSource from './exchange-rates-api/exchange-rates-data-source';
import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        exchangeRatesApi: new ExchangeRatesDataSource(),
    }),
});

const app: express.Application = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
