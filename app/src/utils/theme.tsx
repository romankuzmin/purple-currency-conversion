import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC, PropsWithChildren } from 'react';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(82,36,115,.95)',
        },
    },
});

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
