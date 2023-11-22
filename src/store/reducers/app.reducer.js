import { actionTypes } from '../actions/app.action'

const initialState = {
    questions: {
        data: []
    },
  
    success: false,
    error: {}
}


export default (state = initialState, { type, payload, isLoadMore }) => {
    switch (type) {

    case actionTypes.INDEX:
        if(isLoadMore) {
            payload.questions.data = state.questions.data.concat(payload.questions.data)
        }

        return { ...state, ...payload }


    case actionTypes.CHANGE:
        return {
            ...state,
            questions: {
                ...state.questions,
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
