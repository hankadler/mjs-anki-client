import "animate.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import * as css from "../styles/Start.module.css";
import checkIcon from "../assets/check.png";
import repeatIcon from "../assets/repeat.png";
import backIcon from "../assets/back.svg";
import completedImage from "../assets/completed.png";
import useApp from "../hooks/useApp";
import { GET } from "../utils/api";

export default function Start() {
  const { setStatus, setError, userId, deckId } = useApp();
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([{}]);
  const [count, setCount] = useState(cards.length);
  const [answered, setAnswered] = useState(false);
  const navigate = useNavigate();

  // load deck
  useEffect(() => {
    GET(`users/${userId}/decks/${deckId}`)
      .then(({ error, responseBody }) => {
        if (error) throw error;
        // setImage(responseBody.image);
        setTitle(responseBody.deck.title);
        setCards(responseBody.deck.cards);
      })
      .catch((error) => {
        setStatus(error.message);
        setError(error);
        navigate("/error");
      });
  }, []);

  // keep cards count
  useEffect(() => setCount(cards.length), [cards]);

  const onClose = async () => navigate("/decks");

  const onShow = async () => setAnswered(true);

  const onResult = async (event) => {
    const _cards = cards;
    const _firstCard = _cards.shift();
    if (event.target.parentElement.value === "fail") _cards.push(_firstCard);
    setCards(_cards);
    setCount(_cards.length);
    setAnswered(false);
  };

  const onEnd = async () => navigate("/decks");

  return (
    <div className={css.Start}>
      {count
        ? (
          <>
            <header className={css.Header}>
              <h3 className={css.Title}>{title}</h3>
              <button className={css.CloseButton} type="button" onClick={onClose}>&times;</button>
            </header>
            <main className={css.Main}>
              <fieldset className={css.QuestionBox}>
                <legend>Question</legend>
                <pre>{cards[0].question}</pre>
              </fieldset>

              {answered
                ? (
                  <>
                    <fieldset className={css.AnswerBox}>
                      <legend>Answer</legend>
                      <pre>{cards[0].answer}</pre>
                    </fieldset>
                    <div className={css.NavBar}>
                      <button type="button" data-tip="Got it" onClick={onResult} value="pass">
                        <img src={checkIcon} alt="" width="24" height="24" />
                      </button>
                      <ReactTooltip place="bottom" type="dark" effect="solid" />
                      <button type="button" data-tip="Repeat" onClick={onResult} value="fail">
                        <img src={repeatIcon} alt="" width="24" height="24" />
                      </button>
                      <ReactTooltip place="bottom" type="dark" effect="solid" />
                    </div>
                  </>
                )
                : (
                  <button className={css.ShowButton} type="button" onClick={onShow}>
                    Show
                  </button>
                )}
            </main>

            <footer className={css.Footer}>
              <p>Cards Remaining: {count}</p>
            </footer>
          </>
        )
        : (
          <div className={css.EndBox}>
            <h1>Deck Completed!</h1>
            <div className={css.EndImageBox}>
              <img
                className="animate__animated animate__pulse"
                src={completedImage}
                alt=""
                width="300"
                height="300"
              />
            </div>
            <div className={css.EndButtonBox}>
              <button className={css.EndButton} data-tip="Decks" type="button" onClick={onEnd}>
                <img src={backIcon} alt="" width="48" height="48" />
              </button>
              <ReactTooltip place="bottom" type="dark" effect="solid" />
            </div>
          </div>
        )}
    </div>
  );
}
