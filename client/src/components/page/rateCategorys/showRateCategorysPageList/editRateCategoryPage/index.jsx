import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import TextField from "../../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRateCategorysList,
  getRateCategoryId,
  updateRateCategory,
} from "../../../../../store/rateCategorys";
import { loadRatesList, getRates } from "../../../../../store/rates";

const EditRateCategory = () => {
  const { rateCategoryId } = useParams();
  const dispatch = useDispatch();

  const categorys = useSelector(getRateCategoryId(rateCategoryId));
  const rates = useSelector(getRates());

  const navigate = useNavigate();

  const [data, setData] = useState({
    sourceOfIncome: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadRatesList());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateRateCategory(data, rates, rateCategoryId));

    navigate("/home/main/ratecategoryspage", { replace: true });
  };

  useEffect(() => {
    if (categorys) {
      setData((prevState) => ({
        ...prevState,
        ...categorys,
      }));
    }
  }, [categorys]);

  const validatorConfig = {
    sourceOfIncome: {
      isRequired: {
        message: "Введите источник дохода",
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
          label="Источник расхода"
          name="sourceOfIncome"
          value={data.sourceOfIncome}
          onChange={handleChange}
          error={errors.sourceOfIncome}
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

export default EditRateCategory;
