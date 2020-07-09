import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import CurrencyConvertHistoryDataSource from './currency-convert-history/currency-convert-history-data-source';
import ExchangeRatesDataSource from './exchange-rates-api/exchange-rates-data-source';
import { resolvers, typeDefs } from './schema';
import { createStore } from './store/create-store';
import config from './config';

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        exchangeRatesApi: new ExchangeRatesDataSource(config.get('exchangeRates')),
        currencyConvertHistory: new CurrencyConvertHistoryDataSource({ store }),
    }),
    context: () => ({
        settings: config.get('settings'),
    }),
});

const app: express.Application = express();

server.applyMiddleware({ app });

const port = config.get('port');

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
