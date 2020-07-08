import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { browserHistory, persistor, store } from './redux/store';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ReactRedux = require('react-redux');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackHooks: true,
        trackExtraHooks: [[ReactRedux, 'useSelector']],
    });
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App history={browserHistory} />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
