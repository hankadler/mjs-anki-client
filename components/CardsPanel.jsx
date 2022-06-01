import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as css from "../styles/CardsPanel.module.css";
import addIcon from "../assets/add.png";
import removeIcon from "../assets/remove.png";
import prevIcon from "../assets/prev.png";
import nextIcon from "../assets/next.png";
import Card from "./Card";

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setCards: PropTypes.func.isRequired
};

export default function CardsPanel({ cards, setCards }) {
  const [index, setIndex] = useState(-1);
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [addDisabled, setAddDisabled] = useState(true);
  const [removeDisabled, setRemoveDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  // init
  useEffect(() => {
    if (cards.length > 0) {
      setIndex(0);
      setCount(cards.length);
      setQuestion(cards[0].question);
      setAnswer(cards[0].answer);
    }
  }, []);

  // refresh card & ui constraints
  useEffect(() => {
    if (count) {
      const _cards = [...cards];
      _cards[index].question = question;
      _cards[index].answer = answer;
      setCards(_cards);
    }

    // disable adding card unless there are no cards or current card is not empty
    setAddDisabled(count > 0 && !(question && answer));

    // disable removing card unless there's a card
    setRemoveDisabled(count === 0);

    // disable card navigation unless prev/next index is within bounds
    setPrevDisabled(count === 0 || index === 0);
    setNextDisabled(index === count - 1);
  }, [count, question, answer]);

  // update question & answer?
  useEffect(() => {
    if (index >= 0 && cards[index] !== {}) {
      setQuestion(cards[index].question);
      setAnswer(cards[index].answer);
    }
    // setTimeout(() => console.log({ cards, index, count }), 0);
  }, [index]);

  const onAdd = () => {
    setIndex(index + 1);
    setCount(count + 1);
    setCards([...cards, { question: "", answer: "" }]);
    setQuestion("");
    setAnswer("");
  };

  const onRemove = () => {
    const _cards = [...cards];
    _cards.splice(index, 1);
    setCards(_cards);
    if (_cards.length) {
      setQuestion(cards[index - 1].question);
      setAnswer(cards[index - 1].answer);
    }
    setIndex(index - 1);
    setCount(count - 1);
  };

  const onPrev = () => setIndex(index - 1);

  const onNext = () => setIndex(index + 1);

  return (
    <div className={css.CardsPanel}>
      <button type="button" disabled={prevDisabled} onClick={onPrev}>
        <img src={prevIcon} alt="previous" width="48" height="48" />
      </button>

      <div className={css.Card}>
        <header className={css.Header}>
          <button type="button" disabled={addDisabled} onClick={onAdd}>
            <img src={addIcon} alt="add-card" width="24" height="24" />
          </button>

          <button type="button" disabled={removeDisabled} onClick={onRemove}>
            <img src={removeIcon} alt="remove-card" width="24" height="24" />
          </button>
        </header>

        <main className={css.Main}>
          {
            count
              ? (
                <Card
                  question={question}
                  setQuestion={setQuestion}
                  answer={answer}
                  setAnswer={setAnswer}
                />
              )
              : null
          }
        </main>

        <footer className={css.Footer}>
          {count ? <p>{index + 1} / {count}</p> : <p>-- / --</p>}
        </footer>
      </div>

      <button type="button" disabled={nextDisabled} onClick={onNext}>
        <img src={nextIcon} alt="next" width="48" height="48" />
      </button>
    </div>
  );
}

CardsPanel.propTypes = propTypes;
