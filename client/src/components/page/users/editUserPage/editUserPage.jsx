import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import BackHistoryButton from "../../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../../../store/users";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { edit } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  useEffect(() => {
    if (edit !== "edit") {
      navigate(`${currentUser._id}`);
    }
  }, [edit]);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser({
        ...data,
      })
    ).then(() => {
      navigate(`${currentUser._id}`);
    });
  };
  useEffect(() => {
    if (currentUser && !data) {
      setData({
        ...currentUser,
      });
    }
  }, [currentUser, data]);
  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && currentUser ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
