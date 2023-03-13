import { applyMiddleware, createStore } from "redux";
import { appReducer } from "./reducers/appReducer";

import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)));