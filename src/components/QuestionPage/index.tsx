import React from 'react';
import './Question.scss';
import Button from '../common/Button';
import ResultsPage from '../ResultsPage';
import Stopwatch from '../common/Stopwatch';
import { decodeHtml } from '../../utils';

interface QuestionProps {
  questionsList: any;
}

interface Answer {
  questionNo: number;
  selectedOption: string;
  correct_answer: string;
}

interface QuestionState {
  questionNo: number;
  questionTitle: string;
  options: Array<string>;
  userAnswers: Array<Answer>;
  quizInProgress: boolean;
  startTime: number;
}

class QuestionPage extends React.Component<QuestionProps, QuestionState> {
  state: QuestionState;

  constructor(props: QuestionProps) {
    super(props);
    this.state = {
      questionNo: this.props.questionsList[0].questionNo,
      questionTitle: this.props.questionsList[0].question,
      options: this.props.questionsList[0].options,
      userAnswers: [],
      quizInProgress: true,
      startTime: Date.now()
    };
  }

  isFirstQuestion = () => this.state.questionNo === 0;

  isLastQuestion = () =>
    this.state.questionNo + 1 === this.props.questionsList.length;

  goToNextQuestion = currentQuestionNo => {
    const { questionNo, question, options } = this.props.questionsList[
      currentQuestionNo + 1
    ];
    this.setState({ questionNo, questionTitle: question, options });
  };

  goToPreviousQuestion = currentQuestionNo => {
    const { questionNo, question, options } = this.props.questionsList[
      currentQuestionNo - 1
    ];
    this.setState({ questionNo, questionTitle: question, options });
  };

  updateUserAnswer = (
    questionNo: number,
    selectedOption: string,
    correct_answer: string
  ) => {
    const filtererdAnswers = this.state.userAnswers.filter(
      answer => answer.questionNo !== questionNo
    );

    this.setState({
      userAnswers: [
        ...filtererdAnswers,
        { questionNo, selectedOption, correct_answer }
      ]
    });
  };

  isOptionSelected = (questionNo: number, selectedOption: string) => {
    return this.state.userAnswers.find(
      answer =>
        answer.questionNo === questionNo &&
        answer.selectedOption === selectedOption
    );
  };

  showQuizResults = () => {
    this.setState({ quizInProgress: false });
  };

  render() {
    return this.state.quizInProgress ? (
      <div className="question-container">
        <div className="question-header">
          <div className="category">
            <h3>Category:</h3>
            <span>{this.props.questionsList[0].category}</span>
          </div>
          <div className="difficulty-level">
            <h3>Difficulty Level:</h3>
            <span>{this.props.questionsList[0].difficulty}</span>
          </div>
          <Stopwatch text="Time Elapsed:" />
        </div>
        <h1 className="question-title">
          {`Question ${this.state.questionNo + 1} of ${
            this.props.questionsList.length
          }`}
        </h1>
        <h3 className="question-content">
          {decodeHtml(this.state.questionTitle)}
        </h3>
        <div className="options-list">
          {this.state.options.map(option => {
            return (
              <div
                className={`question-option ${
                  this.isOptionSelected(this.state.questionNo, option)
                    ? 'selected'
                    : ''
                }`}
                key={option}
                onClick={() =>
                  this.updateUserAnswer(
                    this.state.questionNo,
                    option,
                    this.props.questionsList[this.state.questionNo]
                      .correct_answer
                  )
                }
              >
                {decodeHtml(option)}
              </div>
            );
          })}
        </div>
        <div className="navigation-buttons">
          <Button
            buttonText="<< BACK"
            primary
            disabled={this.isFirstQuestion()}
            onClick={() => this.goToPreviousQuestion(this.state.questionNo)}
          />
          <div className="right-aligned-buttons">
            {this.isLastQuestion() && (
              <Button
                buttonText="SUBMIT"
                primary
                onClick={() => this.showQuizResults()}
              />
            )}
            <Button
              buttonText="NEXT >>"
              primary
              disabled={this.isLastQuestion()}
              onClick={() => this.goToNextQuestion(this.state.questionNo)}
            />
          </div>
        </div>
      </div>
    ) : (
      <ResultsPage
        answers={this.state.userAnswers}
        startTime={this.state.startTime}
        questionsCount={this.props.questionsList.length}
      />
    );
  }
}

export default QuestionPage;
