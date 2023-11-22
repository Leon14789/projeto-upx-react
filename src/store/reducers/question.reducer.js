import { actionTypes } from '../actions/question.action'

const initialState = {
    userQuestion: {
        'title': '',
        'description': '',
    },
    success: false,
    error: {}
}


export default (state = initialState, { type, payload }) => {
    
  switch (type) {

  case actionTypes.CHANGE:
    return { ...state,
        
        userQuestion: {
            ...state.userQuestion,
            ...payload 
        }
        
        }

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
