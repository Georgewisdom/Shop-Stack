import { combineReducers } from 'redux'
import shoeReducer from './shoeReducer'
import authReducer from './authReducer'
import alertReducer from './alertReducer'

export default combineReducers({
    shoes: shoeReducer,
    auth: authReducer,
    alert: alertReducer
})