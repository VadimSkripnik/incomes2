import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import TextField from "../../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
  loadReceiptsList,
  getReceiptsAll,
} from "../../../../../store/receipts";
import {
  loadIncomeCategorysList,
  getIncomeCategorysId,
  handleSubmiteEditIncomeCategorys,
} from "../../../../../store/incomeCategorys";

const EditCategoryPage = () => {
  const { incomeCategoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    sourceOfIncome: "",
  });

  const [errors, setErrors] = useState({});
  const receipts = useSelector(getReceiptsAll());
  const categoryId = useSelector(getIncomeCategorysId(incomeCategoryId));

  useEffect(() => {
    dispatch(loadReceiptsList());
    dispatch(loadIncomeCategorysList());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(
      handleSubmiteEditIncomeCategorys(incomeCategoryId, receipts, data)
    );
    navigate("/home/main/incomeCategorysPage", { replace: true });
  };

  useEffect(() => {
    if (categoryId) {
      setData((prevState) => ({
        ...prevState,
        ...categoryId,
      }));
    }
  }, [receipts]);

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
          label="Источник дохода"
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

export default EditCategoryPage;
