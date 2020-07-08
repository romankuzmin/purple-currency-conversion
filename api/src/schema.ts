import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Currency {
        code: String!
        title: String!
    }

    type Query {
        currencies: [Currency]
    }
`;

const currencies = [
    {
        code: 'CZK',
        title: 'CZK',
    },
    {
        code: 'USD',
        title: 'USD',
    },
];

const resolvers = {
    Query: {
        currencies: () => currencies,
    },
};

export { resolvers, typeDefs };
