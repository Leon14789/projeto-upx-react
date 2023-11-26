import { HttpAuth } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionTypes = {
    INDEX: 'QUESTION_INDEX',
    CHANGE: 'QUESTION_CHANGE',
   
 
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

// INDEX

export const indexResponse = (payload, isLoadMore) => ({
    type: actionTypes.INDEX,
    payload,
    isLoadMore
})

export const index = (query, isLoadMore) => dispatch => {
    return HttpAuth.get('/questions?' + new URLSearchParams(query))
                .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data, isLoadMore)))
}

// STORE

export const store = () => dispatch => {
    return HttpAuth.post('/questions')
                .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}

// SHOW 

export const show = (id) => dispatch => {
    return HttpAuth.get('/questions/'+ id)
                .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}


export const filterMyQuestions = (userId, query, isLoadMore) => dispatch => {
  return HttpAuth.post(`/myQuestions/${userId}`, { params: query })
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data, isLoadMore)));
};



