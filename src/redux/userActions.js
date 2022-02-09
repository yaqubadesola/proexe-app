import {
    USER_FETCH_REQUEST,
    USER_FETCH_ERROR,
    USER_FETCH_SUCCESS,
    DELETE_USER,
    ADD_USER,
    GET_USER,
    UPDATE_USER
} from './userActionTypes';

import axios from 'axios';

const fetchRequest = () => {
    return {
        type: USER_FETCH_REQUEST
    }
}

const fetchRequestSuccess = users => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: users
    }
}

const fetchRequestError = error => {
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }
}

const userDeleted = () => {
    return {
        type: DELETE_USER
    }
}

const userAdded = () => {
    return {
        type: ADD_USER
    }
}

const userUpdated = () => {
    return {
        type: UPDATE_USER
    }
}

const getOneUser = user => {
    return {
        type: GET_USER,
        payload: user
    }
}


//axios and Thunk API CALL happens here
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchRequest)
        axios.get(`${process.env.REACT_APP_ENPOINT}`)
            .then(response => {

                dispatch(fetchRequestSuccess(response.data))
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}

//axios and Thunk API CALL happens here
const deleteUser = id => {
    return (dispatch) => {
        dispatch(fetchRequest)
        console.log("Console url", process.env.REACT_APP_ENPOINT)
        axios.delete(`${process.env.REACT_APP_ENPOINT}/${id}`)
            .then(response => {
                console.log("all_users", response)
                dispatch(userDeleted())
                dispatch(fetchUsers())
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}

const getUser = id => {
    return (dispatch) => {
        dispatch(fetchRequest)
        axios.get(`${process.env.REACT_APP_ENPOINT}/${id}`)
            .then(response => {
                dispatch(getOneUser(response.data))
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}
const addUser = user => {

    const newUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
            city: user.city,
        },
    }

    return (dispatch) => {
        dispatch(fetchRequest)
        axios.post(`${process.env.REACT_APP_ENPOINT}`, newUser)
            .then(response => {
                console.log("all_users", response)
                dispatch(userAdded())
                dispatch(fetchUsers())
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}

const editUser = (user, id) => {

    const modifiedUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
            city: user.city,
        },
    }

    return (dispatch) => {
        dispatch(fetchRequest)
        axios.put(`${process.env.REACT_APP_ENPOINT}/${id}`, modifiedUser)
            .then(response => {
                console.log("just got aall_users", response)
                dispatch(userUpdated())
                dispatch(fetchUsers())
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}
export { getUser, editUser, addUser, deleteUser, fetchRequestError, fetchRequest, fetchRequestSuccess, fetchUsers }