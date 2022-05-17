import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../assets/add.png";
import css from "../styles/Decks.module.css";
import useApp from "../hooks/useApp";
import { GET } from "../utils/api";
import { querify } from "../utils/helpers";
import Search from "./Search";
import SortBy from "./SortBy";
import Deck from "./Deck";
import DeckEditor from "./DeckEditor";

function Decks() {
  const { setStatus, setError, userId, decks, setDecks, setDeckId } = useApp();
  const [query, setQuery] = useState({ limit: 12, skip: 0, sort: "title.ascending" });
  const [editorActive, setEditorActive] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const refreshDecks = () => {
    GET(`users/${userId}/decks?${querify(query)}`).then(({ error, responseBody }) => {
      if (error) throw error;
      setDecks(responseBody.decks);
    }).catch((error) => {
      setStatus(error.message);
      setError(error);
      navigate("/error");
    });
  };

  // refresh decks on search/sort
  useEffect(refreshDecks, [query]);

  const add = () => {
    setDeckId("");
    setEditorActive(true);
  };

  const deckEditor = (
    <DeckEditor
      active={editorActive}
      setActive={setEditorActive}
      image={image}
      setImage={setImage}
      title={title}
      setTitle={setTitle}
      cards={cards}
      setCards={setCards}
    />
  );

  return (
    <div className={css.Decks}>
      {decks ? <Search query={query} setQuery={setQuery} /> : null}
      <SortBy query={query} setQuery={setQuery} />
      <div className={css.DeckGrid}>
        <div className={css.Add}>
          <button type="button" onClick={add}>
            <img src={addIcon} alt="" width="150" height="150" />
          </button>
          <h3 className={css.Subtitle}>Add deck</h3>
        </div>
        {decks.map((deck) => (
          <Deck
            key={deck._id}
            deckId={deck._id}
            image={deck.image}
            title={deck.title}
            count={deck.cards.length}
            editor={deckEditor}
            editorActive={editorActive}
            setEditorActive={setEditorActive}
            onChange={refreshDecks}
          />
        ))}
      </div>
      {deckEditor}
    </div>
  );
}

export default Decks;
