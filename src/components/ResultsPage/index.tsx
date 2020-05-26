import React from 'react';
import './ResultsPage.scss';
import LinearProgressBar from '../common/LinearProgressBar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

interface ResultsPageProps {
  answers: object;
  questionsCount: number;
  startTime: number;
}

const checkQuizResults = results => {
  let count = 0;
  results.forEach((answer: any) => {
    if (answer.selectedOption === answer.correct_answer) {
      count++;
    }
  });
  return count;
};

const millisToMinutesAndSeconds = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes} min(s) ${seconds} secs`;
};

const ResultsPage: React.FC<ResultsPageProps> = ({
  answers,
  questionsCount,
  startTime
}) => {
  console.log('Answers:', answers);
  const correct_answers = checkQuizResults(answers);

  return (
    <div className="results-page-container">
      <h3 className="greeting-text">
        Congratulations! You have successfully completed the quiz.
      </h3>
      <h1 className="score-container">
        <span>Your Score:</span> {`${correct_answers}/${questionsCount}`}
        <div className="progressbar-container">
          <div className="progressbar-text">
            <span className="correct">{`Correct: 
            ${Math.round((correct_answers / questionsCount) * 100)} %`}</span>
            <span className="incorrect">
              {`Incorrect: 
              ${Math.round(
                ((questionsCount - correct_answers) / questionsCount) * 100
              )} %`}
            </span>
          </div>
          <LinearProgressBar
            percent={correct_answers / questionsCount}
            width="500"
            fillColor="#90f789"
            backgroundColor="red"
          />
        </div>
      </h1>
      <h2>Time Taken: {millisToMinutesAndSeconds(Date.now() - startTime)}</h2>
      <Link to="/">
        <Button buttonText="RESTART QUIZ" primary onClick={() => {}} />
      </Link>
    </div>
  );
};

export default ResultsPage;
