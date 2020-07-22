import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENCIES = gql`
    {
        currencies {
            code
            title
        }
    }
`;

type Currency = {
    code: string;
    title: string;
};

const useCurrenciesQuery = () => {
    const { loading, error, data, refetch } = useQuery(CURRENCIES, {
        fetchPolicy: 'cache-and-network',
    });

    const currencies = data ? (data.currencies as Currency[]) : [];

    return {
        loading,
        error,
        currencies,
        refetch,
    };
};

export default useCurrenciesQuery;
