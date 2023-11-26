import { actionTypes } from '../actions/response.actions'

const initialState = {
    userResponse: {
        'title': '',
        'description': '',
        question_id: parseInt(localStorage.getItem('user_id'), 10) || 0,
    },
    responses: {
        data: [],
        total: 0,
      },
    success: false,
    error: {}
}


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload, isLoadMore }) => {
  switch (type) {
 
  

    

    case actionTypes.INDEX:
      console.log("Payload recebido no reducer:", payload);
      return {
        ...state,
        responses: {
          data: payload.responses,
          total: payload.responses.length,
        },
      };

    case actionTypes.SUCCESS: 
        return {
            ...state,
            success: payload
        }

        case actionTypes.ERROR: 
        return {
            ...state,
            error: payload
        }
        
        

  default:
    return state
  }
}
