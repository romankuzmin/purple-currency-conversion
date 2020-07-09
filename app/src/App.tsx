import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { useSettings } from './redux/settings/useSettings';
import { HomeScreen } from './screens';
import { GraphQLProvider } from './utils/graphql';
import { IntlProvider } from './utils/i18n';
import { ThemeProvider } from './utils/theme';

type AppProps = {
    history: History;
};

const App: FC<AppProps> = ({ history }) => {
    const { settings } = useSettings();
    return (
        <GraphQLProvider>
            <IntlProvider locale={settings.locale}>
                <ThemeProvider>
                    <CssBaseline />
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route render={() => <div>Miss</div>} />
                        </Switch>
                    </ConnectedRouter>
                </ThemeProvider>
            </IntlProvider>
        </GraphQLProvider>
    );
};

export default App;
