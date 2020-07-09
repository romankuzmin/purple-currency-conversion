import { useQuery } from '@apollo/react-hooks';
import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import { gql } from 'apollo-boost';
import React, { FC, memo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import config from '../../config';
import ConvertedCurrencySummary from './ConvertedCurrencySummary';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
        },
    }),
);

const STATISTICS = gql`
    {
        statistics {
            mostPopularDestinationCurrency
            totalAmountConverted
            totalNumberOfConversions
        }
    }
`;

type ConvertedCurrencyDashboardProps = {
    refresh: boolean;
};

const ConvertedCurrencyDashboard: FC<ConvertedCurrencyDashboardProps> = ({ refresh }) => {
    const { loading, data, refetch } = useQuery(STATISTICS);
    const classes = useStyles();

    useEffect(() => {
        if (refresh) {
            refetch();
        }
    }, [refresh, refetch]);

    const stats = data && data.statistics ? data.statistics : {};
    const intl = useIntl();
    const totalAmountConvertedIntl = stats.totalAmountConverted
        ? intl.formatNumber(stats.totalAmountConverted, {
              style: 'currency',
              currency: config.settings.currency,
          })
        : 0;

    return (
        <Grid container className={classes.root} spacing={2} alignItems="stretch">
            <Grid item xs={12} sm={4}>
                <ConvertedCurrencySummary
                    loading={loading}
                    title="app.convertedCurrencySummary.mostPopularDestinationCurrency"
                    value={stats.mostPopularDestinationCurrency}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <ConvertedCurrencySummary
                    loading={loading}
                    title="app.convertedCurrencySummary.totalAmountConverted"
                    value={totalAmountConvertedIntl}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <ConvertedCurrencySummary
                    loading={loading}
                    title="app.convertedCurrencySummary.totalNumberOfConversions"
                    value={stats.totalNumberOfConversions}
                />
            </Grid>
        </Grid>
    );
};

export default memo(ConvertedCurrencyDashboard);
