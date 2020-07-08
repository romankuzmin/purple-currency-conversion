import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { HomeScreen } from './screens';

type AppProps = {
    history: History;
};

const App: FC<AppProps> = ({ history }) => {
    return (
        <>
            <CssBaseline />
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route render={() => <div>Miss</div>} />
                </Switch>
            </ConnectedRouter>
        </>
    );
};

export default App;
