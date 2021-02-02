import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../resources/Utilities'

const initialState = {
    isLoggedIn: true
}

const authStart = (state, action) => {
    return updateObject(state, { isLoggedIn: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        default:
            return state
    }
}

export default reducer