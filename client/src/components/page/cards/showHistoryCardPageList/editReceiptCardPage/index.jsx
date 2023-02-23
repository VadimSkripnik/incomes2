import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import TextField from "../../../../common/form/textField";
import {
  loadReceiptsList,
  takeReceipt,
  handleSubmitReceipt,
} from "../../../../../store/receipts";
import { loadCardsList, getCards } from "../../../../../store/cards";
import { useDispatch, useSelector } from "react-redux";

const EditReceiptCardPageForm = () => {
  const { cardId, edit } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    data: "",
    nameCardReceipt: "",
    profit: "",
  });
  const [errors, setErrors] = useState({});

  const receiptId = useSelector(takeReceipt(edit));
  const cards = useSelector(getCards());

  useEffect(() => {
    dispatch(loadReceiptsList(cardId));
    dispatch(loadCardsList());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(handleSubmitReceipt(edit, data, cards));

    navigate(-1);
  };

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...receiptId,
    }));
  }, [receiptId]);

  const validatorConfig = {
    profit: {
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

  if (receiptId && cards) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Дата"
                name="data"
                value={data.data}
                onChange={handleChange}
              />

              <TextField
                label="Сколько поступило"
                name="profit"
                value={String(data.profit)}
                onChange={handleChange}
                error={errors.profit}
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
        </div>
      </div>
    );
  }
  return "loading...";
};

export default EditReceiptCardPageForm;
