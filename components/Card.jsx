import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import showIcon from "../assets/show.png";
import hideIcon from "../assets/hide.png";
import * as css from "../styles/Card.module.css";

const propTypes = {
  question: PropTypes.string.isRequired,
  setQuestion: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
};

export default function Card({ question, setQuestion, answer, setAnswer }) {
  const [answerShown, setAnswerShown] = useState(false);
  const [answerDisplayIcon, setAnswerDisplayIcon] = useState(showIcon);

  const changeQuestion = (event) => setQuestion(event.target.value);

  const changeAnswer = (event) => setAnswer(event.target.value);

  const toggleAnswerDisplay = () => setAnswerShown(!answerShown);

  useEffect(() => (
    answerShown ? setAnswerDisplayIcon(hideIcon) : setAnswerDisplayIcon(showIcon)
  ), [answerShown]);

  return (
    <div className={css.Card}>
      <label htmlFor="question">
        <h4>Question</h4>
        <textarea id="question" value={question} onChange={changeQuestion} />
      </label>
      <label htmlFor="answer">
        <h4>Answer</h4>
        <textarea id="answer" value={answer} onChange={changeAnswer} />
        <button className={css.AnswerDisplayButton} type="button" onClick={toggleAnswerDisplay}>
          <img src={answerDisplayIcon} alt="toggle-answer-display" width="24" height="24" />
        </button>
      </label>
    </div>
  );
}

Card.propTypes = propTypes;
