import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

type ConvertCurrency = {
    amount: number;
    from: string;
    to: string;
};

type ConvertCurrencyPayload = {
    convertCurrency: {
        amount: number;
    };
};

const CONVERT_CURRENCY = gql`
    mutation ConvertCurrency($input: ConvertCurrencyInput!) {
        convertCurrency(input: $input) {
            amount
        }
    }
`;

const useConvertCurrencyMutation = () => {
    const [convertCurrencyMutation, { error }] = useMutation<ConvertCurrencyPayload>(CONVERT_CURRENCY);

    const convertCurrency = async (values: ConvertCurrency) => {
        const result = await convertCurrencyMutation({ variables: { input: values } });
        return result.data ? result.data.convertCurrency.amount : null;
    };

    return {
        convertCurrency,
        error,
    };
};

export default useConvertCurrencyMutation;
