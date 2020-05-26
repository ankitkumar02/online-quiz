import * as constants from '../constants/action-types';

const initialState = {
  questionsList: {
    fetching: null,
    data: null,
    error: null
  }
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_QUESTIONS_LIST_REQUEST:
      debugger;
      return {
        ...state,
        questionsList: { fetching: true, data: null, error: null }
      };
    case constants.FETCH_QUESTIONS_LIST_SUCCESS:
      debugger;
      return {
        ...state,
        questionsList: { fetching: false, data: action.response, error: null }
      };
    case constants.FETCH_QUESTIONS_LIST_ERROR:
      return {
        ...state,
        questionsList: { fetching: false, data: null, error: action.error }
      };
    default:
      return state;
  }
};

export default questionReducer;
