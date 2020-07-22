import { Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Alert from '../Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        alert: {
            marginBottom: theme.spacing(2),
        },
    }),
);

type ErrorMessageProps = {
    message: string;
    action?: boolean;
    onClickRefresh?: () => void;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ message, action = false, onClickRefresh = () => {} }) => {
    const classes = useStyles();

    return (
        <Alert
            severity="error"
            message={message}
            className={classes.alert}
            action={
                action ? (
                    <Button color="inherit" size="small" onClick={onClickRefresh}>
                        <FormattedMessage id="app.currencyConvert.refresh" />
                    </Button>
                ) : null
            }
        />
    );
};

export default ErrorMessage;
