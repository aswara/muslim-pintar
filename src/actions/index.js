import { LOGIN,LOGOUT } from '../types'

export const userAction = (payload, login, token) => {
    return(dispatch) => {
        dispatch ({
            type: LOGIN,
            payload,
            login,
            token
        })
    }
}

export const loginAction = (token, payload) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN,
            token : token,
            login : true,
            payload         
        })
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({
            type: LOGOUT,
            token : null,
            login : false,
            payload: null
        })
    }
}
