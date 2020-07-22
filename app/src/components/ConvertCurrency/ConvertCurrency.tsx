import React, { FC, memo, useCallback, useEffect } from 'react';
import { useConvertCurrencyMutation, useCurrenciesQuery } from '../../hooks';
import ConversionForm, { ConversionFormValues } from '../ConversionForm/ConversionForm';
import ErrorMessage from './ErrorMessage';

type ConvertCurrencyProps = {
    onConverted?: (amount: number, currency: string) => void;
    onError?: () => void;
    onReady?: () => void;
};

const ConvertCurrency: FC<ConvertCurrencyProps> = ({
    onConverted = () => {},
    onError = () => {},
    onReady = () => {},
}) => {
    const { convertCurrency, error: mutationError } = useConvertCurrencyMutation();
    const { loading, currencies, error: queryError, refetch } = useCurrenciesQuery();

    useEffect(() => {
        if (!loading && currencies.length > 0) {
            onReady();
        }
    }, [loading, currencies]);

    useEffect(() => {
        if (queryError || mutationError) {
            onError();
        }
    }, [onError, queryError, mutationError]);

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
