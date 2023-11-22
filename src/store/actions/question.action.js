import { Http } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";



export const actionTypes = {
    CHANGE: 'QUESTION_CHANGE',
    SUCCESS: 'QUESTION_SUCCESS',
    ERROR: 'QUESTION_ERROR'
}

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})

export const success = (payload) => ({
  type: actionTypes.SUCCESS,
  payload
})


export const errors = (payload) => ({
  type: actionTypes.ERROR,
  payload
})


export const question = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Enviando sua Pergunta'
    }))
    return Http.post('/api/question', data)
        .then(res => {
            dispatch(changeLoading({open: false}))
            dispatch(success(true))
            if (typeof res !== 'undefined') {
                if (res.data) {
                    dispatch(changeNotify({
                        open: true,
                        class: 'success',
                        msg: 'Pergunta enviada com Sucesso'
                    }))
                }
            }
        })
        .catch(error => {
            dispatch(changeLoading({open: false}))
                if (error.response) {
                    dispatch(errors(error.response.data.errors))
                }
        })
}
