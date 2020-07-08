import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { HomeScreen } from './screens';
import { IntlProvider } from './utils/i18n';

type AppProps = {
    history: History;
};

const App: FC<AppProps> = ({ history }) => (
    <IntlProvider locale="en">
        <CssBaseline />
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route render={() => <div>Miss</div>} />
            </Switch>
        </ConnectedRouter>
    </IntlProvider>
);

export default App;
