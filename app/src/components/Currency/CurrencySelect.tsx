import { useQuery } from '@apollo/react-hooks';
import {
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import { gql } from 'apollo-boost';
import { Field } from 'formik';
import { Select } from 'formik-material-ui';
import React, { FC, memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: theme.spacing(18),
        },
        fieldProgress: {
            '&> div': {
                paddingBottom: theme.spacing(1.7),
            },
            '&> svg': {
                display: 'none',
            },
        },
        progress: {
            marginLeft: theme.spacing(2),
        },
        fieldError: {
            '&> div': {
                paddingRight: `${theme.spacing(2)}px !important`,
                paddingBottom: theme.spacing(1.7),
                display: 'flex',
                justifyContent: 'center',
            },
            '&> svg': {
                display: 'none',
            },
        },
        iconButton: {
            padding: 0,
        },
    }),
);

const CURRENCIES = gql`
    {
        currencies {
            code
            title
        }
    }
`;

type Currency = {
    code: string;
    title: string;
};

type CurrencySelectProps = {
    name: string;
    label: string;
};

const CurrencySelect: FC<CurrencySelectProps> = ({ name, label }) => {
    const { loading, error, data, refetch } = useQuery(CURRENCIES);
    const classes = useStyles();
    const currencies = data ? (data.currencies as Currency[]) : [];
    const id = `${name}-select`;
    const labelId = `${id}-label`;

    const handleRefresh = useCallback(async () => {
        refetch();
    }, [refetch]);

    let valueToRender = loading && <CircularProgress color="primary" size={20} className={classes.progress} />;

    valueToRender =
        !valueToRender && error ? (
            <IconButton color="secondary" size="small" className={classes.iconButton} onClick={handleRefresh}>
                <RefreshIcon />
            </IconButton>
        ) : (
            valueToRender
        );

    const fieldClass = loading ? classes.fieldProgress : '';

    return (
        <FormControl variant="outlined" className={classes.root} error={!!error}>
            <InputLabel htmlFor={labelId}>
                <FormattedMessage id={label} />
            </InputLabel>
            <Field
                labelId={labelId}
                component={Select}
                name={name}
                className={error ? classes.fieldError : fieldClass}
                inputProps={{
                    id,
                }}
                label={<FormattedMessage id={label} />}
                renderValue={(value: string) => (valueToRender ? valueToRender : value)}
            >
                {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                        {currency.code}
                    </MenuItem>
                ))}
            </Field>
            {error ? (
                <FormHelperText>
                    <FormattedMessage id="app.currencySelect.errors.fetchError" />
                </FormHelperText>
            ) : null}
        </FormControl>
    );
};

export default memo(CurrencySelect);
