/* tslint:disable */
import * as constants from '../constants/action-types';

const shuffleArray: any = array => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const fetchQuestionsList = (amount, category, difficulty) => {
  return dispatch => {
    dispatch({ type: constants.FETCH_QUESTIONS_LIST_REQUEST });
    fetch(
      `${constants.QUESTION_API_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        if (response.response_code === 0) {
          response.results.map((result: any, index: number) => {
            result.questionNo = index;
            result.options = shuffleArray([
              ...result.incorrect_answers,
              result.correct_answer
            ]);
          });
          console.log(response);
          dispatch({
            type: constants.FETCH_QUESTIONS_LIST_SUCCESS,
            response: response.results
          });
        } else {
          dispatch({
            type: constants.FETCH_QUESTIONS_LIST_ERROR,
            error: response
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: constants.FETCH_QUESTIONS_LIST_ERROR, error });
      });
  };
};
