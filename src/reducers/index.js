import { LOGIN, LOGOUT } from '../types'
import { combineReducers } from 'redux' 

const initialState = {
    token: '',
    user: ''
}

const userReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                data: action.payload,
                login: action.login
            }
        case LOGOUT:
            return {
                token: action.token,
                data: action.payload,
                login: action.login
            }
        default:
            return state
    }
}

export default combineReducers({ userReducer })