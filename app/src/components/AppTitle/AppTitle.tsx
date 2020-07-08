import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            fontSize: '1.5rem',
        },
    }),
);

type AppTitleProps = {
    title?: string;
};

const AppTitle: FC<AppTitleProps> = ({ title = 'app.title' }) => {
    const classes = useStyles();
    const intl = useIntl();
    const appTitle = intl.formatMessage({ id: title });

    return (
        <>
            <Helmet>
                <title>{appTitle}</title>
            </Helmet>
            <Typography variant="h1" className={classes.root}>
                {appTitle}
            </Typography>
        </>
    );
};

export default AppTitle;
