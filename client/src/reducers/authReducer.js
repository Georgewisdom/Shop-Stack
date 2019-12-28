import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    processing: true,
    user: null,
    msg: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: true,
                processing: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                processing: false,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                processing: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: action.payload,
                isAuthenticated: true,
                processing: false,
            };
        default:
            return state;
    }
}