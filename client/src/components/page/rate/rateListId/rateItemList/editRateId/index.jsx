import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../../../utils/validator";
import TextField from "../../../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";

import {
  loadRatesList,
  getRateId,
  updateRate,
  getRatesSum,
} from "../../../../../../store/rates";
import { loadCardsList, getCards } from "../../../../../../store/cards";
import {
  loadDailyExpenses,
  getDailyExpenses,
} from "../../../../../../store/dailyExpenses";

const EditRateId = () => {
  const { editrate } = useParams();
  const { rateId } = useParams();

  const dispatch = useDispatch();

  const rate = useSelector(getRateId(editrate));
  const ratesSum = useSelector(getRatesSum());
  const cards = useSelector(getCards());
  const dailyExpensesAll = useSelector(getDailyExpenses());

  const navigate = useNavigate();

  const [data, setData] = useState({
    itemName: "",
    quantity: "",
    sum: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(loadDailyExpenses());
    dispatch(loadRatesList());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(updateRate(rateId, data, ratesSum, dailyExpensesAll, cards, rate));
    navigate(`/home/main/mainlist/${rateId}`, { replace: true });
  };

  useEffect(() => {
    if (rate) {
      setData((prevState) => ({
        ...prevState,
        ...rate,
      }));
    }
  }, [rate]);

  const validatorConfig = {
    quantity: {
      isContainDigitOneNumber: {
        message: "Введите число",
      },
    },
    sum: {
      isContainDigitOneNumber: {
        message: "Введите число",
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
    <div className="col-md-6 offset-md-3 shadow p-4">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Наименование расхода"
          name="itemName"
          value={data.itemName}
          onChange={handleChange}
        />
        <TextField
          label="Кол-во единиц"
          name="quantity"
          value={String(data.quantity)}
          onChange={handleChange}
          error={errors.quantity}
        />
        <TextField
          label="Цена за единицу"
          name="sum"
          value={String(data.sum)}
          onChange={handleChange}
          error={errors.sum}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Обновить
        </button>
      </form>
    </div>
  );
};

export default EditRateId;
