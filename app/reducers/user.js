export const RECEIVE_USER = 'RECEIVE_USER'

const receiveUser = function (user) {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const userReducer = function (state={}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        default: return state
    }
}

//async action creator that will dispatch sync creator
export const getUser = function (userId) {
    return function (dispatch) {
        fetch('/api/users/' + userId)
            .then(res => res.json())
            .then(user => {
                const action = receiveUser(user);
                dispatch(action);
            }).catch(err => console.error(err))
    }
}



