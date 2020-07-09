import { Grid, Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { FC, memo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: theme.spacing(3),
            marginTop: theme.spacing(2),
        },
        gridItem: {
            display: 'flex',
            alignItems: 'center',
        },
        gridItemAmount: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('sm')]: {
                justifyContent: 'flex-end',
            },
        },
        title: {
            fontSize: '2rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem',
            },
        },
        amount: {
            fontSize: '3rem',
            fontWeight: 'bold',
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
        },
    }),
);

type ConvertedAmountProps = {
    amount: number;
    currency: string;
};

const ConvertedAmount: FC<ConvertedAmountProps> = ({ amount, currency }) => {
    const classes = useStyles();
    const intl = useIntl();
    const convertedAmount = intl.formatNumber(amount, {
        style: 'currency',
        currency,
    });

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <Typography variant="h2" className={classes.title}>
                        <FormattedMessage id="app.convertedAmount.amount" />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.gridItemAmount}>
                    <Typography variant="h3" className={classes.amount}>
                        {convertedAmount}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default memo(ConvertedAmount);
