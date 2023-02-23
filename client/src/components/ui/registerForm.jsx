import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/users";

const RegisterForm = ({ toggleFormType }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = validate();
    if (!isValid) return;

    const newData = {
      ...data,
    };
    dispatch(signUp(newData))
      .then(() => {
        navigate("/home", { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <form
        className="ws-layout-column ws-align-items-center auth-wrap__card"
        onSubmit={handleSubmit}
      >
        <img
          src="../../../assets/images/piggyBankImg.png"
          className="auth-wrap__logo"
        />
        <div className="ws-subheader-2-primary auth-wrap__title">
          Регистрация
        </div>
        {loginError && <p className="text-danger">{loginError}</p>}
        <div className="input-block input-block input-block--required">
          <div className="input-block__label input-block__label">
            Электронная почта
            <span> *</span>
          </div>
          <div className="ws-layout-row ws-align-items-start-center input-block__input-wrap input-block__input-wrap">
            <div className="ws-layout-column ws-align-items-start-stretch ws-flex-grow-1 input-block__input-position-wrap input-block__input-position-wrap">
              <TextField
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <div className="ws-layout-row ws-align-items-start-end input-block__fields-error input-block__fields-error">
                <div className="ws-flex-grow-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="input-block input-block input-block--required input-block--with-icon">
          <div className="input-block__label input-block__label">
            Пароль
            <span> *</span>
          </div>
          <div className="ws-layout-row ws-align-items-start-center input-block__input-wrap input-block__input-wrap">
            <div className="ws-layout-column ws-align-items-start-stretch ws-flex-grow-1 input-block__input-position-wrap input-block__input-position-wrap">
              <TextField
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
              />
              <div className="ws-layout-row ws-align-items-start-end input-block__fields-error input-block__fields-error">
                <div className="ws-flex-grow-1"></div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="ws-layout-row ws-align-items-center ws-button ws-button--secondary"
          type="submit"
          disabled={!isValid}
        >
          <span>Зарегистрироваться</span>
        </button>
        <button
          className="ws-layout-row ws-align-items-center ws-button ws-button--thin"
          onClick={toggleFormType}
        >
          <span>Войти в личный кабинет</span>
        </button>
        <div className="ws-caption-2-primary required-field-description">
          <span>*</span> - поле, обязательное для заполнения
        </div>
      </form>
    </>
  );
};

RegisterForm.propTypes = {
  toggleFormType: PropTypes.func,
};

export default RegisterForm;
