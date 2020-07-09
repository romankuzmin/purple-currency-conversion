import { gql } from 'apollo-server-express';
import CurrencyConvertHistoryDataSource from './currency-convert-history/currency-convert-history-data-source'
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
    currencyConvertHistory: CurrencyConvertHistoryDataSource;
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
            const convertedAmount = await dataSources.exchangeRatesApi.convert(amount, from, to);
            await dataSources.currencyConvertHistory.save({
                ...input,
                convertedAmount
            });

            return {
                amount: convertedAmount,
            };
        },
    },
};

export { resolvers, typeDefs };
