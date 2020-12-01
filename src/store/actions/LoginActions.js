import { TRY_LOGIN, ADD_USER } from '../types/LoginTypes';

export const tryLogin = payload => {
    return {
        type: TRY_LOGIN,
        payload
    }
}

export const addUser = payload => {
    return {
        type: ADD_USER,
        payload
    }
}