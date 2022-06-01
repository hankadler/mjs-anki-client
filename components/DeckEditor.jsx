import "react-tabs/style/react-tabs.css";
import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as css from "../styles/DeckEditor.module.css";
import useApp from "../hooks/useApp";
import DeckPanel from "./DeckPanel";
import CardsPanel from "./CardsPanel";
import { POST, PATCH } from "../utils/api";

const propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setCards: PropTypes.func.isRequired,
};

export default function DeckEditor({
  active, setActive, image, setImage, title, setTitle, cards, setCards
}) {
  const { setStatus, setError, userId, decks, deckId } = useApp();
  const windowTitle = deckId ? "Edit Deck" : "Add Deck";
  const [tabIndex, setTabIndex] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  /**
   * Sets image, title and cards by deckId.
   */
  useEffect(() => {
    if (active && deckId) {
      const deck = decks.filter(({ _id }) => _id === deckId)[0];
      setImage(deck.image);
      setTitle(deck.title);
      setCards(deck.cards);
    }
  }, [active]);

  /**
   * Disables submit unless:
   *   - cards exist
   *   - cards are not empty (question && answer !== "")
   *   - a change has been made (e.g. modified image, title or card)
   */
  useEffect(() => {
    if (active) {
      const isAnyCardEmpty = cards.filter(({ question, answer }) => !(question && answer)).length;
      setSubmitDisabled(!cards.length || isAnyCardEmpty);
    }
  }, [image, title, cards]);

  const onClose = async () => {
    setActive(false);
    setTabIndex(0);
    setImage("");
    setTitle("");
    setCards([]);
  };

  const onSubmit = async () => {
    const resource = deckId ? `users/${userId}/decks/${deckId}` : `users/${userId}/decks`;
    const requestBody = { image, title, cards };
    const { error, responseBody } = (
      deckId ? await PATCH(resource, requestBody) : await POST(resource, requestBody)
    );
    if (error) {
      setStatus(error.message);
      setError(error);
      navigate("/error");
    } else {
      setStatus(responseBody.status);
      await onClose();
    }
  };

  return (
    <div className={css.Overlay} style={active ? { display: "block" } : { display: "none" }}>
      <div className={css.Window}>
        <header className={css.TitleBar}>
          <h4 className={css.Title}>{windowTitle}</h4>
          <button className={css.CloseButtonTop} type="button" onClick={onClose}>&times;</button>
        </header>
        <main className={css.Main}>
          <Tabs
            selectedTabClassName={css.SelectedTab}
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Deck</Tab>
              <Tab>Cards</Tab>
            </TabList>
            <TabPanel>
              <DeckPanel image={image} setImage={setImage} title={title} setTitle={setTitle} />
            </TabPanel>
            <TabPanel>
              <CardsPanel cards={cards} setCards={setCards} />
            </TabPanel>
          </Tabs>
        </main>
        <footer className={css.Footer}>
          <button className={css.Submit} type="button" disabled={submitDisabled} onClick={onSubmit}>
            Submit
          </button>
        </footer>
      </div>
    </div>
  );
}

DeckEditor.propTypes = propTypes;
