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

    type Mutation {
        convertCurrency(input: ConvertCurrencyInput!): ConvertCurrencyPayload
    }

    input ConvertCurrencyInput {
        amount: Float
        from: String
        to: String
    }

    type ConvertCurrencyPayload {
        amount: Float
    }
`;

type DataSources = {
    exchangeRatesApi: ExchangeRatesDataSource;
};

type Context = {
    dataSources: DataSources;
};

type ConvertCurrencyArgs = {
    input: {
        amount: number;
        from: string;
        to: string;
    };
};

const resolvers = {
    Query: {
        currencies: async (parent: void, args: void, { dataSources }: Context) =>
            dataSources.exchangeRatesApi.getCurrencies(),
    },
    Mutation: {
        convertCurrency: async (parent: void, { input }: ConvertCurrencyArgs, { dataSources }: Context) => {
            const { amount, from, to } = input;
            return {
                amount: await dataSources.exchangeRatesApi.convert(amount, from, to),
            };
        },
    },
};

export { resolvers, typeDefs };
