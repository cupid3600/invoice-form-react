import { handleActions } from 'redux-actions';
import { 
    loginRequesting,
    loginSuccess,
    loginFailure,
    logout,
} from '../actions/auth';


const initialState = () => {
    const email = localStorage.getItem('email');
    return ({
        requesting: false,
        authenticated: email !== undefined && email != null ? 1 : 0, //0: init, 1: login_success, -1: login failed 
        email: email,
        message: {},
        error: {},
    })
};

export default handleActions(
    {
        [loginRequesting]: (state) => {
            return {
                ...state,
                email: '',
                message: { body: 'Logging in...', time: new Date() },
                error: {},
            }
        },

        [loginSuccess]: (state, {payload}) => {
            let admin = payload.admin;
            localStorage.setItem('email', admin.email);
            return {
                ...state,
                requesting: false,
                authenticated: 1,
                email: admin.email,
                message: {},
                error: {},
            }
        },

        [loginFailure]: (state, {payload}) => {
            return {
                ...state,
                requesting: false,
                authenticated: -1,
                message: {},
                error: {
                    body: payload.message,
                    time: new Date(),
                },
            }
        },

        [logout]: (state) => {
            localStorage.removeItem('email');
  
            return {
                ...state, authenticated: 0
            }
        },
        // [resetPassword]: (state, {payload}) => {
        //     return {
        //         ...state, resetPassword: true,
        //    }
        // },
    },
    initialState()
);