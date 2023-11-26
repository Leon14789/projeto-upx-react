import { actionTypes } from '../actions/app.action'

const initialState = {
    questions: {
        data: [],
        total: 0,
    },
    questionId: {},
    
    myQuestions: {
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
          let updatedData;
        
          if (isLoadMore) {
            updatedData = state.questions.data.concat(payload.data);
          } else {
            updatedData = payload.data;
          }
        
          return {
            ...state,
            questions: {
              data: updatedData,
              total: payload.total,
            },
          };
        

      
          case actionTypes.CHANGE:
            return {
              ...state,
              questions: {
                ...state.questions,
                ...payload,
              },
            };
      
          case actionTypes.SUCCESS:
            return {
              ...state,
              success: payload,
            };
      
          case actionTypes.ERROR:
            return {
              ...state,
              error: payload,
            };

            case actionTypes.SHOW:
              return {
                  ...state,
                  questionId: payload,
              };
      
          default:
            return state;
        }
      };