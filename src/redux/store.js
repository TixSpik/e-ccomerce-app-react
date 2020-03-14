import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export const persistor = persistStore(store)

export default { store, persistor }