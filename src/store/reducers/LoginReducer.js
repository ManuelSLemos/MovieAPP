import { TRY_LOGIN } from '../types/LoginTypes';

const initialState = { 
    users: [
        { id: 0, email: 'm.lemos@geekshubs.com', pwd: 'admin1234', try: 3, block: false, date_block: ''},
        { id: 1, email: 'mario@geekshubs.com', pwd: '123456', try: 3, block: false, date_block: ''},
        { id: 2, email: 'analemos@geekshubs.com', pwd: 'admin@', try: 3, block: false, date_block: ''},
        { id: 3, email: 'davidlemos@geekshubs.com', pwd: 'abcd1234', try: 3, block: false, date_block: ''},
    ]
};

const LoginReducer = ( state = initialState, action) => {

    switch(action.type) {

        case TRY_LOGIN:
            let users = state.users.filter( user => user.id === action.payload.id);
            let user = state.users.find( user => user.id === action.payload.id );
            
            if(user.try !== 0) {
                user.try -= 1;
            }
            
            if (user.try === 0) {
                user.block = true
                user.date_block = action.payload.date
            }

            users.push(user);

            return {
                ...state,
                users
            }


    }
    
    return state;
};

export default LoginReducer;