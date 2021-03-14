import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../resources/Utilities'

const token = sessionStorage.getItem('token')
let initialState = {
    isLoggedIn: false
}

if(token) {
    initialState = {
        isLoggedIn: true
    }
}

const onAuthEnd = (state, action) => {
    sessionStorage.removeItem('token')
    return updateObject(state, { isLoggedIn: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, { isLoggedIn: true })
        case actionTypes.AUTH_END: return onAuthEnd(state, action)
        default: return state
    }
}

export default reducer