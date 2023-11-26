import { Http } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";

export const actionTypes = {
    CHANGE: 'REGISTER_CHANGE',
    SUCCESS: 'REGISTER_SUCCESS',
    ERROR: 'REGISTER_ERROR'
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

export const setUserToken = (user) => dispatch => {

    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('user_email', user.email);

    dispatch(change({
        name: '',
        email: '',
        password: ''
    }));

    dispatch(success(true));
}

export const register = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Cadastrando Usuario...'
    }))
    return Http.post('/register', data)

    .then(res => {
        dispatch(changeLoading({ open: false }));
    
        console.log(res);
        if (res.status === 201) {
            if (res.data && res.data.user) {
                dispatch(changeNotify({
                    open: true,
                    class: 'success',
                    msg: 'Usuario cadastrado com Sucesso'
                }))
                dispatch(setUserToken(res.data.user))
            }
        }
    })
        .catch(error => {
            dispatch(changeLoading({ open: false }))
            if (error.response) {
                dispatch(errors(error.response.data.errors))
            }
        })
}
