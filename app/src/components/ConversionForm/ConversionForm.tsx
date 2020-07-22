import { Button, Grid, InputAdornment, LinearProgress, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import React, { FC, memo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CurrencySelect } from '../Currency';

export type ConversionFormValues = {
    amount: number;
    from: string;
    to: string;
};

type ConversionFormProps = {
    loading?: boolean;
    disabled?: boolean;
    onSubmit?: (values: ConversionFormValues, setSubmitting: (isSubmitting: boolean) => void) => void;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        submitButton: {
            width: '100%',
            height: '100%',
            maxHeight: theme.spacing(7),
        },
        toCurrency: {
            display: 'flex',
            justifyContent: 'flex-end',
            [theme.breakpoints.up('sm')]: {
                paddingRight: theme.spacing(2),
            },
        },
        formContent: {
            padding: theme.spacing(3),
        },
        progress: {
            height: theme.spacing(0.5),
        },
        amount: {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
    }),
);

const ConversionForm: FC<ConversionFormProps> = ({ loading = false, disabled = false, onSubmit = () => {} }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Formik
            initialValues={{
                from: 'CZK',
                to: 'USD',
                amount: 100,
            }}
            validate={(values) => {
                const errors: Partial<{ amount: string }> = {};
                if (values.amount <= 0) {
                    errors.amount = intl.formatMessage({ id: 'app.convertCurrencyForm.errors.minAmount' });
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting);
            }}
        >
            {({ submitForm, isSubmitting, values, errors }) => {
                const progress = isSubmitting || loading;
                return (
                    <Form name="convertCurrencyForm">
                        <Paper>
                            <div className={classes.formContent}>
                                <Grid container className={classes.grid} spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <Field
                                            component={TextField}
                                            name="amount"
                                            type="number"
                                            label={<FormattedMessage id="app.convertCurrencyForm.amount" />}
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">{values.from}</InputAdornment>
                                                ),
                                            }}
                                            className={classes.amount}
                                            error={errors.amount}
                                            disabled={disabled || progress}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <CurrencySelect
                                            name="from"
                                            label="app.convertCurrencyForm.from"
                                            disabled={disabled || progress}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <div className={classes.toCurrency}>
                                            <CurrencySelect
                                                name="to"
                                                label="app.convertCurrencyForm.to"
                                                disabled={disabled || progress}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={disabled || progress}
                                            onClick={submitForm}
                                            size="large"
                                            className={classes.submitButton}
                                        >
                                            <FormattedMessage id="app.convertCurrencyForm.submit" />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                            {progress ? <LinearProgress /> : <div className={classes.progress} />}
                        </Paper>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default memo(ConversionForm);
