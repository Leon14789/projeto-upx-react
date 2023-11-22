// Sempre importar os Reducers aqui
import { combineReducers }from 'redux';
import loadingReducer from './loading.reducer';
import notifyReducer from './notify.reducer'
import alertReducer from './alert.reducer'
import authReducer from './auth.reducer'
import registerReducer from './register.reducer'
import questionReducer from './question.reducer'
import appReducer from './app.reducer';
const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    authReducer,
    registerReducer,
    questionReducer,
    appReducer,
   
    


})

export default rootReducer;