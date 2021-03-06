import React from 'react';
import { connect } from 'react-redux';
import QuestionPage from '../QuestionPage';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './QuizPage.scss';
import Button from '../common/Button';

interface QuizPageProps extends RouteComponentProps {
  questionsList: {
    data: any;
    error: object;
    fetching: boolean;
  };
}

class QuizPage extends React.Component<QuizPageProps, {}> {
  render() {
    return (
      <div className="quiz-page-container">
        {this.props.questionsList.fetching && (
          <h3 className="loading-quiz-container">
            Preparing Your Quiz.. Please wait..
          </h3>
        )}

        {this.props.questionsList.data && (
          <div className="questions-container">
            <QuestionPage questionsList={this.props.questionsList.data} />
          </div>
        )}

        {this.props.questionsList.error && (
          <div className="loading-error-container">
            <h3> Unable to retrieve questions. Please try again.</h3>
            <Button
              buttonText="GO BACK -> START PAGE"
              primary
              onClick={() => this.props.history.goBack()}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  questionsList: store.question.questionsList
});

export default connect(mapStateToProps, null)(withRouter(QuizPage));
