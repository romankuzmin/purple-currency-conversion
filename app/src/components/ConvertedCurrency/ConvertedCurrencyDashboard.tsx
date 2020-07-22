import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import config from '../../config';
import useStatisticsQuery from '../../hooks/useStatisticsQuery';
import ConvertedCurrencySummary from './ConvertedCurrencySummary';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
        },
    }),
);

type ConvertedCurrencyDashboardProps = {
    refresh: boolean;
};

const ConvertedCurrencyDashboard: FC<ConvertedCurrencyDashboardProps> = ({ refresh }) => {
    const { loading, statistics, refetch } = useStatisticsQuery();
    const classes = useStyles();

    useEffect(() => {
        if (refresh) {
            refetch();
        }
    }, [refresh, refetch]);

    const intl = useIntl();
    const totalAmountConvertedIntl = statistics.totalAmountConverted
        ? intl.formatNumber(statistics.totalAmountConverted, {
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
                    value={statistics.mostPopularDestinationCurrency}
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
                    value={statistics.totalNumberOfConversions}
                />
            </Grid>
        </Grid>
    );
};

export default memo(ConvertedCurrencyDashboard);
