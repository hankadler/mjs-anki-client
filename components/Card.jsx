import PropTypes from "prop-types";
import { useState } from "react";
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
  const [resizing, setResizing] = useState(false);

  const changeQuestion = async (event) => setQuestion(event.target.value);

  const changeAnswer = async (event) => setAnswer(event.target.value);

  const toggleAnswerDisplay = async () => setAnswerShown(!answerShown);

  const onMouseDown = async () => setResizing(true);
  const onMouseUp = async () => setResizing(false);

  /* eslint-disable no-nested-ternary */
  return (
    <div className={css.Card}>
      <label htmlFor="question">
        <h4>Question</h4>
        <textarea id="question" value={question} onChange={changeQuestion} />
      </label>
      <label htmlFor="answer">
        <h4>Answer</h4>
        <textarea
          id="answer"
          className={resizing ? "" : (answerShown ? css.someHeight : css.zeroHeight)}
          value={answer}
          onChange={changeAnswer}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
        <button className={css.AnswerDisplayButton} type="button" onClick={toggleAnswerDisplay}>
          <img
            src={answerShown ? hideIcon : showIcon}
            alt="toggle-answer-display"
            width="24"
            height="24"
          />
        </button>
      </label>
    </div>
  );
}

Card.propTypes = propTypes;
