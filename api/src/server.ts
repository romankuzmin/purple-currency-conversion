import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import CurrencyConvertHistoryDataSource from './currency-convert-history/currency-convert-history-data-source';
import ExchangeRatesDataSource from './exchange-rates-api/exchange-rates-data-source';
import { resolvers, typeDefs } from './schema';
import { createStore } from './store/create-store';

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        exchangeRatesApi: new ExchangeRatesDataSource(),
        currencyConvertHistory: new CurrencyConvertHistoryDataSource({ store }),
    }),
});

const app: express.Application = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
