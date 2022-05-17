import PropTypes from "prop-types";
import css from "../styles/DeckPanel.module.css";
import editIcon from "../assets/edit.png";
import { toBase64 } from "../utils/helpers";

const propTypes = {
  image: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired
};

export default function DeckPanel({ image, setImage, title, setTitle }) {
  const onBrowse = async (event) => {
    const file = event.target.files[0];
    const blobBase64 = await toBase64(file);
    setImage(blobBase64);
  };

  const browse = async () => document.getElementById("browseImage").click();

  return (
    <div className={css.DeckPanel}>
      <h4>Image</h4>
      <div className={css.ImageContainer}>
        <img className={css.Image} key={image} src={image} alt="deck-cover" />
        <input id="browseImage" className={css.displayNone} type="file" onChange={onBrowse} />
        <button className={css.ImageEditButton} data-tip="Edit" type="button" onClick={browse}>
          <img src={editIcon} alt="" width="24" height="24" />
        </button>
      </div>
      <h4>Title</h4>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
    </div>
  );
}

DeckPanel.propTypes = propTypes;
