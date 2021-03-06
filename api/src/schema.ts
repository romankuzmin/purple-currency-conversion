import { gql } from 'apollo-server-express';
import CurrencyConvertHistoryDataSource from './currency-convert-history/currency-convert-history-data-source';
import ExchangeRatesDataSource from './exchange-rates-api/exchange-rates-data-source';

const typeDefs = gql`
    type Currency {
        code: String!
        title: String!
    }

    type Stats {
        mostPopularDestinationCurrency: String!
        totalAmountConverted: Float!
        totalNumberOfConversions: Int!
    }

    type Query {
        currencies: [Currency]
        statistics(input: StatisticsInput): Stats
    }

    type Mutation {
        convertCurrency(input: ConvertCurrencyInput!): ConvertCurrencyPayload
    }

    input StatisticsInput {
        forCurrency: String
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
    settings: {
        totalAmountConvertedCurrency: string;
    };
};

type StatisticsArgs = {
    input: {
        forCurrency: string;
    };
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
        statistics: async (parent: void, { input }: StatisticsArgs, { dataSources, settings }: Context) => {
            const destinationCurrency =
                input && input.forCurrency ? input.forCurrency : settings.totalAmountConvertedCurrency;
            const stats = await dataSources.currencyConvertHistory.getStatistics();
            const convertedAmounts = await dataSources.exchangeRatesApi.bulkConvert(
                stats.currencyAmounts,
                destinationCurrency,
            );
            const totalAmountConverted = convertedAmounts.reduce((result, item) => result + item, 0);

            return {
                ...stats,
                totalAmountConverted,
            };
        },
    },
    Mutation: {
        convertCurrency: async (parent: void, { input }: ConvertCurrencyArgs, { dataSources }: Context) => {
            const { amount, from, to } = input;
            const convertedAmount = await dataSources.exchangeRatesApi.convert(amount, from, to);
            const currencyConvertHistory = await dataSources.currencyConvertHistory.save({
                ...input,
                convertedAmount,
            });

            return {
                amount: currencyConvertHistory.convertedAmount,
            };
        },
    },
};

export { resolvers, typeDefs };
