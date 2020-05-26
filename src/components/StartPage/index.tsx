import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './StartPage.scss';
import { category_options, difficulty_options } from './options';
import Button from '../common/Button';
import { fetchQuestionsList } from '../../actions/question-actions';

interface StartPageProps extends RouteComponentProps {
  fetchQuestions: Function;
}

interface StartPageState {
  number_of_questions: string;
  category: string;
  difficulty: string;
}

class StartPage extends React.Component<StartPageProps, StartPageState> {
  public state: StartPageState;
  public constructor(props: StartPageProps) {
    super(props);
    this.state = {
      number_of_questions: '3',
      category: category_options[1].value,
      difficulty: difficulty_options[1].value
    };
  }

  onNumOfQuestionsChange = event => {
    this.setState({ number_of_questions: event.target.value });
  };

  handleCategorySelection = option => {
    this.setState({ category: option.value });
  };

  handleDifficultySelection = option => {
    this.setState({ difficulty: option.value });
  };

  handleStartButtonClick = () => {
    const { number_of_questions, category, difficulty } = this.state;
    this.props.fetchQuestions(number_of_questions, category, difficulty);
    this.props.history.push('/quiz');
  };

  render() {
    return (
      <div className="summary-container">
        <div className="rules-list">
          <h3>Instructions: </h3>
          <ol>
            <li>
              Online Quiz is a platform to check your knowledge in various
              domains of current affairs.
            </li>
            <li>
              You can select the number of questions, category and difficulty
              level for the quiz to start.
            </li>
            <li>There is no time restriction to finish this quiz.</li>
          </ol>
        </div>
        <div className="questions-container">
          <h3>Number Of Questions (1-50):</h3>
          <input
            type="text"
            className="questions-input-value"
            value={this.state.number_of_questions}
            onChange={this.onNumOfQuestionsChange}
          />
        </div>
        <div className="select-category-container">
          <h3>Select Category:</h3>
          <Select
            options={category_options}
            defaultValue={category_options[1]}
            onChange={this.handleCategorySelection}
            isSearchable={false}
          />
        </div>
        <div className="select-difficulty-container">
          <h3>Select Difficulty:</h3>
          <Select
            options={difficulty_options}
            defaultValue={difficulty_options[1]}
            onChange={this.handleDifficultySelection}
            isSearchable={false}
          />
        </div>

        <Button
          primary
          buttonText="START QUIZ"
          onClick={this.handleStartButtonClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchQuestions: (amount, category, difficulty) =>
    dispatch(fetchQuestionsList(amount, category, difficulty))
});

export default withRouter(connect(null, mapDispatchToProps)(StartPage));
