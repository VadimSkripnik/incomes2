import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginEyeSvg from "../../../svgFile/loginEyeSvg"

const TextField = ({ type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className={value ? "input-block--required" : "input-block--error"}>
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === "password" && (
            
          <div className="input-block__icon input-block__icon input-block__icon--with-label" onClick={toggleShowPassword}>
            <div>
              <div>
              <LoginEyeSvg/>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="input-block__text-overflow input-block__text-overflow">
            {error}
          </div>
        )}
      </div>
    </>
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
