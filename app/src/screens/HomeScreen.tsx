import { Container, Drawer, Hidden, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles } from '@material-ui/styles';
import React, { FC, useCallback, useState } from 'react';
import AppTitle from '../components/AppTitle';
import { ConvertCurrency } from '../components/ConvertCurrency';
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

const HomeScreen: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState();

    const handleMenu = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleConverted = useCallback((amount) => {
        setAmount(amount);
    }, []);

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
                {amount ? <div>Amount: {amount}</div> : null}
            </Container>
            <Drawer anchor="left" open={open} onClose={handleMenu}>
                <LocaleList />
            </Drawer>
        </>
    );
};

export default HomeScreen;
