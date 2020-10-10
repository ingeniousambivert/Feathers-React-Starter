import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider as StoreProvider } from "react-redux";
import Store from "./store/";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(Store);

ReactDOM.render(
	// <React.StrictMode>
	<StoreProvider store={Store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</StoreProvider>,
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
