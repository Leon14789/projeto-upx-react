// Configuracoes iniciais para usar o Store
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'
import routesReducers from './reducers/routesReducers'

let middleware = [ReduxThunk];

export const store = createStore(routesReducers, applyMiddleware(...middleware));