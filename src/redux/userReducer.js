


import {
    USER_FETCH_REQUEST,
    USER_FETCH_ERROR,
    DELETE_USER,
    USER_FETCH_SUCCESS,
    ADD_USER,
    GET_USER,
    UPDATE_USER
} from './userActionTypes';

const initialState = {
    isLoading: true,
    users: [],
    user: {},
    error: ""
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case USER_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            }
        case USER_FETCH_ERROR:
            return {
                user: [],
                isLoading: false,
                error: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                isLoading: false
            }
        case ADD_USER:
            return {
                ...state,
                isLoading: false
            }
        case GET_USER:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export { usersReducer }