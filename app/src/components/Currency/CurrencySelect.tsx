import { FormControl, InputLabel, MenuItem, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { Select } from 'formik-material-ui';
import React, { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import useCurrenciesQuery from '../../hooks/useCurrenciesQuery';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: theme.spacing(18),
        },
    }),
);

type CurrencySelectProps = {
    name: string;
    label: string;
    disabled?: boolean;
};

const CurrencySelect: FC<CurrencySelectProps> = ({ name, label, disabled }) => {
    const { currencies } = useCurrenciesQuery();
    const classes = useStyles();
    const id = `${name}-select`;
    const labelId = `${id}-label`;

    return (
        <FormControl variant="outlined" className={classes.root} disabled={disabled}>
            <InputLabel htmlFor={labelId}>
                <FormattedMessage id={label} />
            </InputLabel>
            <Field
                labelId={labelId}
                component={Select}
                name={name}
                inputProps={{
                    id,
                }}
                label={<FormattedMessage id={label} />}
                disabled={disabled}
            >
                {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                        {currency.code}
                    </MenuItem>
                ))}
            </Field>
        </FormControl>
    );
};

export default memo(CurrencySelect);
