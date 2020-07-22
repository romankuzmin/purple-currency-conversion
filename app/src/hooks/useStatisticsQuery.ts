import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const STATISTICS = gql`
    {
        statistics {
            mostPopularDestinationCurrency
            totalAmountConverted
            totalNumberOfConversions
        }
    }
`;

const useStatisticsQuery = () => {
    const { loading, error, data, refetch } = useQuery(STATISTICS);
    const statistics = data && data.statistics ? data.statistics : {};

    return {
        loading,
        error,
        statistics,
        refetch,
    };
};

export default useStatisticsQuery;
