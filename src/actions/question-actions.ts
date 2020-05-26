// tslint:disable
import * as constants from '../constants/action-types';
import { shuffleArrayElements } from '../utils';

export const fetchQuestionsList = (
  amount: number,
  category: string,
  difficulty: string
) => {
  return (dispatch: any) => {
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
            result.options = shuffleArrayElements([
              ...result.incorrect_answers,
              result.correct_answer
            ]);
          });
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
