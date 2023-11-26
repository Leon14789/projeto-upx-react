import { Http, HttpAuth } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";

export const actionTypes = {
  CHANGE: 'RESPONSE_CHANGE',
  SUCCESS: 'RESPONSE_SUCCESS',
  ERROR: 'RESPONSE_ERROR',
  INDEX: 'RESPONSE_INDEX',
};

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

export const success = (payload) => ({
  type: actionTypes.SUCCESS,
  payload,
});

export const errors = (payload) => ({
  type: actionTypes.ERROR,
  payload,
});



export const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload: {
    data: payload,
    total: payload.length, 
  },
});



export const index = (question_id) => (dispatch) => {
  return HttpAuth.post(`/listResponse/${question_id}`)
    .then((res) => {
      if (typeof res !== 'undefined') {
        dispatch(indexResponse(res.data.responses));
      }
    })
    .catch((error) => {
      console.error("Erro na solicitação de índice:", error);
    });
};





export const response = (data) => (dispatch) => {
  const question_id = localStorage.getItem('question_id');

  if (!question_id || isNaN(question_id)) {
    console.error('Pergunta inválida');
    return;
  }

  const requestData = {
    ...data,
    question_id: parseInt(question_id, 10),
  };

  dispatch(
    changeLoading({
      open: true,
      msg: 'Enviando sua Resposta',
    })
  );

  return Http.post('/api/response', requestData)
    .then((res) => {
      dispatch(changeLoading({ open: false }));
      dispatch(success(true));
      if (typeof res !== 'undefined' && res.data) {
        dispatch(
          changeNotify({
            open: true,
            class: 'success',
            msg: 'Resposta enviada com Sucesso',
          })
        );
      }
    })
    .catch((error) => {
      dispatch(changeLoading({ open: false }));
      if (error.response) {
        dispatch(errors(error.response.data.errors));
      }
    });
};


