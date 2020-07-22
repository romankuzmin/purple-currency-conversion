import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { FC, memo, useCallback } from 'react';
import ConversionForm from '../ConversionForm/ConversionForm';
import ErrorMessage from './ErrorMessage';
import { useCurrenciesQuery } from '../../hooks';

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
    const [convertCurrency, { error: mutationError }] = useMutation<ConvertCurrencyPayload>(CONVERT_CURRENCY);
    const { loading, error: queryError, refetch } = useCurrenciesQuery();

    const handleRefresh = useCallback(async () => {
        refetch();
    }, [refetch]);

    const handleSubmit = useCallback(
        async (values: ConvertCurrency, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                const result = await convertCurrency({ variables: { input: values } });
                if (result.data) {
                    onConverted(result.data.convertCurrency.amount, values.to);
                }
            } catch (e) {
            } finally {
                setSubmitting(false);
            }
        },
        [convertCurrency, onConverted],
    );

    return (
        <>
            {mutationError || queryError ? (
                <ErrorMessage
                    message={
                        queryError ? 'app.currencyConvert.errors.fetchCurrencies' : 'app.currencyConvert.errors.convert'
                    }
                    action={!!queryError}
                    onClickRefresh={handleRefresh}
                />
            ) : null}
            <ConversionForm onSubmit={handleSubmit} loading={loading} disabled={!!queryError} />
        </>
    );
};

export default memo(ConvertCurrency);
