import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import * as css from "../styles/Deck.module.css";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import startIcon from "../assets/start.png";
import useApp from "../hooks/useApp";
import { DELETE } from "../utils/api";
import config from "../config";

const propTypes = {
  deckId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  editor: PropTypes.node.isRequired,
  editorActive: PropTypes.bool.isRequired,
  setEditorActive: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default function Deck({
  deckId, image, title, count, editor, editorActive, setEditorActive, onChange
}) {
  const { setStatus, setError, userId, setDeckId } = useApp();
  const navigate = useNavigate();

  // refresh decks on change
  useEffect(() => { if (!editorActive) onChange(); }, [editorActive]);

  const remove = async () => {
    const { error, responseBody } = await DELETE(`users/${userId}/decks/${deckId}`);
    if (error) {
      setStatus(error.message);
      setError(error);
      navigate("/error");
    } else {
      if (config.ENV === "dev") console.log(responseBody);
      setStatus("Deleted.");
      onChange();
    }
  };

  const edit = async () => {
    setDeckId(deckId); // set global deckId to local deckId
    setEditorActive(true);
  };

  const start = async () => {
    setDeckId(deckId); // set global deckId to local deckId
    navigate("/start");
  };

  return (
    <div className={css.Deck}>
      <div className={css.ImageContainer}>
        <img className={css.Image} src={image} alt="" />
      </div>
      <h3 className={css.Title}>{title}</h3>
      <div className={css.ToolBar}>
        <p className={css.CardsCount}>Cards: {count}</p>
        <button className={css.Icon} data-tip="Delete" type="button" onClick={remove}>
          <img src={deleteIcon} alt="" width="24" height="24" />
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
        <button className={css.Icon} data-tip="Edit" type="button" onClick={edit}>
          <img src={editIcon} alt="" width="24" height="24" />
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
        <button className={css.Icon} data-tip="Start" type="button" onClick={start}>
          <img src={startIcon} alt="" width="24" height="24" />
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
      {editor}
    </div>
  );
}

Deck.propTypes = propTypes;
