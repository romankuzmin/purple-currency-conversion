import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { FC, memo, useCallback } from 'react';
import ConversionForm from '../ConversionForm/ConversionForm';

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

type ConvertCurrencyProps = {
    onConverted?: (amount: number, currency: string) => void;
};

const ConvertCurrency: FC<ConvertCurrencyProps> = ({ onConverted = () => {} }) => {
    const [convertCurrency] = useMutation<ConvertCurrencyPayload>(CONVERT_CURRENCY);

    const handleSubmit = useCallback(
        async (values: ConvertCurrency, setSubmitting: (isSubmitting: boolean) => void) => {
            const result = await convertCurrency({ variables: { input: values } });
            if (result.data) {
                onConverted(result.data.convertCurrency.amount, values.to);
            }
            setSubmitting(false);
        },
        [convertCurrency, onConverted],
    );

    return <ConversionForm onSubmit={handleSubmit} />;
};

export default memo(ConvertCurrency);
