import React, { FC, memo, useCallback } from 'react';
import { useConvertCurrencyMutation, useCurrenciesQuery } from '../../hooks';
import ConversionForm, { ConversionFormValues } from '../ConversionForm/ConversionForm';
import ErrorMessage from './ErrorMessage';

type ConvertCurrencyProps = {
    onConverted?: (amount: number, currency: string) => void;
};

const ConvertCurrency: FC<ConvertCurrencyProps> = ({ onConverted = () => {} }) => {
    const { convertCurrency, error: mutationError } = useConvertCurrencyMutation();
    const { loading, error: queryError, refetch } = useCurrenciesQuery();

    const handleRefresh = useCallback(async () => {
        refetch();
    }, [refetch]);

    const handleSubmit = useCallback(
        async (values: ConversionFormValues, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                const amount = await convertCurrency(values);
                if (amount) {
                    onConverted(amount, values.to);
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
