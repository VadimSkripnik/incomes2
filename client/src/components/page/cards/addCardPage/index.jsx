import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import { useDispatch } from "react-redux";
import { addCard } from "../../../../store/cards";

const AddCardPageForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const paramsCategory = {
    id: Date.now(),
    color:
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7),
    cardId: Date.now() + Math.floor(Math.random() * 1000),
  };

  const cloneParamsCategory = { ...paramsCategory };

  const [rateCategory, setRateCategory] = useState({
    id: String(cloneParamsCategory.id + 1),
    sourceOfIncome: "",
    color: cloneParamsCategory.color,
    cardId: String(cloneParamsCategory.cardId),
  });

  const [category, setCategory] = useState({
    id: String(cloneParamsCategory.id),
    sourceOfIncome: "",
    color: cloneParamsCategory.color,
    cardId: String(cloneParamsCategory.cardId),
  });

  const [data, setData] = useState({
    id: category.cardId,
    nameCard: "",
    name: "",
    incomeCategorys: [category.id],
    rateCategorys: [rateCategory.id],
  });

  const [receipt, setReceipt] = useState({
    id: String(cloneParamsCategory.id),
    category: category.id,
    nameCardReceipt: "",
    sourceOfIncome: "",
    profit: "",
    data: new Date().toLocaleDateString(),
    color: cloneParamsCategory.color,
    cardId: String(cloneParamsCategory.cardId),
  });

  useEffect(() => {
    setReceipt((prevState) => ({
      ...prevState,
      sourceOfIncome: category.sourceOfIncome,
      nameCardReceipt: data.nameCard,
    }));
  }, [category, data]);

  useEffect(() => {
    setReceipt((prevState) => ({
      ...prevState,
      sourceOfIncome: category.sourceOfIncome,
      nameCardReceipt: data.nameCard,
    }));
  }, [category, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(addCard(category, rateCategory, data, receipt));
    navigate("/home/main/mainlist", { replace: true });
  };

  const validatorConfig = {
    sourceOfIncome: {
      isRequired: {
        message: "Введите данные",
      },
    },
    profit: {
      isContainDigit: {
        message: "Введите число",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [receipt]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeCategory = (target) => {
    setCategory((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeRateCategory = (target) => {
    setRateCategory((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeReceipt = (target) => {
    setReceipt((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validate = () => {
    const errors = validator(receipt, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="col-md-6 offset-md-3 shadow p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Добавить категорию дохода"
          name="sourceOfIncome"
          onChange={handleChangeCategory}
          error={errors.sourceOfIncome}
        />
        <TextField
          label="Добавить категорию расхода"
          name="sourceOfIncome"
          onChange={handleChangeRateCategory}
        />
        <TextField
          label="Добавить сумму"
          name="profit"
          onChange={handleChangeReceipt}
          error={errors.profit}
        />
        <TextField
          label="Названия карты или другого дохода"
          name="nameCard"
          onChange={handleChange}
        />
        <TextField
          label="Наименование (например калым)"
          name="name"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddCardPageForm;
