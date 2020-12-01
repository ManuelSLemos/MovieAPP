import { TRY_LOGIN } from '../types/LoginTypes';

export const tryLogin = payload => {
    return {
        type: TRY_LOGIN,
        payload
    }
}