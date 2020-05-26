import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="page-content">
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/quiz" exact component={QuizPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
