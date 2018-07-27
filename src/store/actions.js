import { SET_NEWS } from './actionTypes'

export const setNews = (data) => {
    return {
        type: SET_NEWS,
        payload: data
    }
}