import { HttpAuth } from '../../config/Http'

export const actionTypes = {
    INDEX: 'QUESTION_INDEX',
    CHANGE: 'QUESTION_CHANGE',
    SHOW: 'QUESTION_SHOW'
   
 
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

export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload,
  });
  

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

export const showResponse = (payload) => ({
    type: actionTypes.SHOW,
    payload,
});


export const show = (id) => dispatch => {
    return HttpAuth.get('/questions/' + id)
        .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)));
}



export const filterMyQuestions = (userId, query, isLoadMore) => dispatch => {
  return HttpAuth.post(`/myQuestions/${userId}`, { params: query })
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data, isLoadMore)));
};



