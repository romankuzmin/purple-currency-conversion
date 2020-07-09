import { Card, CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
        },
        summary: {
            fontWeight: 'bold',
        },
        title: {
            fontSize: theme.spacing(2),
        },
    }),
);

type ConvertedCurrencySummaryProps = {
    title?: string;
    value?: number | string;
    loading: boolean;
};

const ConvertedCurrencySummary: FC<ConvertedCurrencySummaryProps> = ({ title, value, loading }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <FormattedMessage id={title} />
                </Typography>
                <Typography variant="h5" component="h2" className={classes.summary}>
                    {loading && !value ? <Skeleton animation="wave" variant="text" height={15} /> : value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default memo(ConvertedCurrencySummary);
