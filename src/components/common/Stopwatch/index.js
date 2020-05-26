import React, { Component } from 'react';
import './Stopwatch.scss';

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
    return this.state.timerTime;
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="stopwatch">
        <div className="stopwatch-header-container">
          <h3 className="stopwatch-header">{this.props.text}</h3>
          <div className="stopwatch-display">
            {hours} : {minutes} : {seconds} : {centiseconds}
          </div>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
