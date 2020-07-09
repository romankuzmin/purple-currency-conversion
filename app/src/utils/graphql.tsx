import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React, { FC, PropsWithChildren } from 'react';
import config from '../config';

const graphql = new ApolloClient({
    uri: config.api.url,
});

export const GraphQLProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return <ApolloProvider client={graphql}>{children}</ApolloProvider>;
};
