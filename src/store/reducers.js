import { SET_NEWS } from './actionTypes'

const initialState = {
    news : []
}

const reducers = (state = initialState, action) => {
    if(action.type === SET_NEWS){
        return { ...state, news: action.payload }
    }
    return state
}

export default reducers