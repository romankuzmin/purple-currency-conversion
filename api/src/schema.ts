import { gql } from 'apollo-server-express';
import ExchangeRatesDataSource from './exchange-rates-api/exchange-rates-data-source';

const typeDefs = gql`
    type Currency {
        code: String!
        title: String!
    }

    type Query {
        currencies: [Currency]
    }
`;

type DataSources = {
    exchangeRatesApi: ExchangeRatesDataSource;
};

type Context = {
    dataSources: DataSources;
};

const resolvers = {
    Query: {
        currencies: async (parent: void, args: void, { dataSources }: Context) =>
            dataSources.exchangeRatesApi.getCurrencies(),
    },
};

export { resolvers, typeDefs };
