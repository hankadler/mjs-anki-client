import css from "../styles/Banner.module.css";

export default function Banner() {
  return (
    <div className={css.Banner}>
      <h1 className={css.title}>
        <span className={css.dropCap}>A</span>nki
      </h1>
      <p className={css.subTitle}>Learn via flashcards</p>
    </div>
  );
}
