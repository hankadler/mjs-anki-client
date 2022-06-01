import PropTypes from "prop-types";
import * as css from "../styles/PortalField.module.css";

const propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["email", "password"]),
  minLength: PropTypes.number,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onKeyPress: PropTypes.func
};

const defaultProps = {
  type: "text",
  minLength: 0,
  onKeyPress: null
};

export default function PortalField(
  { id, text, type, minLength, state, setState, disabled, onKeyPress }
) {
  const onChange = (event) => setState(event.target.value);
  return (
    <label className={css.PortalField} htmlFor={id}>
      {text}
      <input
        id={id}
        type={type}
        minLength={minLength}
        value={state}
        onChange={onChange}
        disabled={disabled}
        onKeyPress={onKeyPress}
      />
    </label>
  );
}

PortalField.propTypes = propTypes;
PortalField.defaultProps = defaultProps;
