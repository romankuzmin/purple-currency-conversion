import { Container, Drawer, Hidden, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles } from '@material-ui/styles';
import React, { FC, useCallback, useEffect, useState } from 'react';
import AppTitle from '../components/AppTitle';
import { ConvertCurrency } from '../components/ConvertCurrency';
import { ConvertedAmount } from '../components/ConvertedAmount';
import { ConvertedCurrencyDashboard } from '../components/ConvertedCurrency';
import Header from '../components/Header';
import { LocaleSelect } from '../components/Locale';
import LocaleList from '../components/Locale/LocaleList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        drawer: {
            width: 250,
        },
    }),
);

type ConvertedAmountState = {
    amount: number;
    currency: string;
};

const HomeScreen: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [refreshDashboard, setRefreshDashboard] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState<ConvertedAmountState>();

    useEffect(() => {
        if (refreshDashboard) {
            setRefreshDashboard(false);
        }
    }, [refreshDashboard]);

    const handleMenu = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleConverted = useCallback(
        (amount, currency) => {
            setConvertedAmount({
                amount,
                currency,
            });
            setRefreshDashboard(true);
        },
        [setRefreshDashboard],
    );

    return (
        <>
            <Header>
                <Hidden smUp>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <AppTitle />
                <Hidden xsDown>
                    <LocaleSelect />
                </Hidden>
            </Header>
            <Container maxWidth="md" className={classes.container}>
                <ConvertCurrency onConverted={handleConverted} />
                {convertedAmount && convertedAmount.amount ? <ConvertedAmount {...convertedAmount} /> : null}
                <ConvertedCurrencyDashboard refresh={refreshDashboard} />
            </Container>
            <Drawer anchor="left" open={open} onClose={handleMenu}>
                <LocaleList />
            </Drawer>
        </>
    );
};

export default HomeScreen;
