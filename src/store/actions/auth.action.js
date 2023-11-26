import { Http } from "../../config/Http"
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'
export const actionTypes =  {
    CHANGE: 'AUTH_CHANGE', 
    SUCCESS: 'AUTH_SUCCESS'
}

export const change  = (payload) => ({
  type: actionTypes.CHANGE,
  payload
})


export const success = (payload) => ({
  type: actionTypes.SUCCESS,
  payload
})


export const setUserToken = user => dispatch => {
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_name', user.name); 
    localStorage.setItem('user_email', user.email);
   
    dispatch(change({
        email: '',
        password: ''
    }))

    dispatch(success(true))

  
}

export const login = credentials => dispatch => {
  
    dispatch(changeLoading({
      open: true,
      msg: 'Autenticando Usuario'
    }))

    return Http.post('login', {
      email: credentials.email,
      password: credentials.password
    })
    .then(res => {
      dispatch(changeLoading({ open: false }))
      if (typeof res !== 'undefined') {
          if(res.data.user) {
             dispatch( setUserToken(
              {id: res.data.user.id,
              name: res.data.user.name,}));
          }
      }
     

    })
    .catch(error => {
      dispatch(changeLoading({ open: false }))
      
      if (typeof error.response !== 'undefined') {
          if(error.response.status === 400 || error.response.status === 401 ) {
              dispatch(changeNotify({
                open: true,
                class: 'error',
                msg: 'Email ou senha INCORRETOS'
              }))
          }
      }
    })
  }