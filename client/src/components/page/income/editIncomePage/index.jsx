import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import MultiSelectField from "../../../common/form/multiSelectField";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCardsList,
  getCards,
  updateCategorysCards,
  updateCategoryCards,
  updateReceiptsCards,
} from "../../../../store/cards";
import { loadReceiptsList } from "../../../../store/receipts";
import {
  loadIncomeCategorysList,
  getIncomeCategorys,
  incomeCategorysList,
  incomeCategorysNewObject,
} from "../../../../store/incomeCategorys";

const EditIncomePageForm = () => {
  const { incomeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [some, setSome] = useState("");
  const [data, setData] = useState({
    name: "",
    incomeCategorys: [],
  });

  const [incomeCategorysTransform, setIncomeCategorysTransform] = useState([]);
  const [cardIncomeId, setCardIncomeId] = useState([]);
  const [errors, setErrors] = useState({});

  const categorys = useSelector(getIncomeCategorys());
  const categoryNewObject = useSelector(incomeCategorysNewObject());
  const categorysList = useSelector(
    incomeCategorysList(some, categoryNewObject)
  );

  const cards = useSelector(getCards());

  useEffect(() => {
    dispatch(loadReceiptsList());
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
    dispatch(updateCategoryCards());
    dispatch(updateReceiptsCards());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { incomeCategorys } = data;

    const transformIncomeCategorys = incomeCategorys.map(
      (el) => (el = el.value)
    );

    dispatch(
      updateCategorysCards(
        incomeId,
        {
          ...data,
          incomeCategorys: transformIncomeCategorys,
        },
        transformIncomeCategorys
      )
    );

    navigate("/home/main/mainlist", { replace: true });
  };

  useEffect(() => {
    if (cards) {
      const cardRateIds = cards.filter((el) => el._id === incomeId);
      setCardIncomeId(cardRateIds);
    }
  }, [cards]);
 

  useEffect(() => {
    setSome(cardIncomeId);
    setIncomeCategorysTransform(categoryNewObject);
  }, [cardIncomeId]);

  useEffect(() => {
    try {
      if (incomeCategorysTransform && categoryNewObject && some) {
        const someArr = some[0];
        const filterIncomeCategoryArr = incomeCategorysTransform.filter((i) =>
          someArr.incomeCategorys.includes(i.value)
        );
  
        setData({
          ...someArr,
          incomeCategorys: filterIncomeCategoryArr.map((i) => ({
            label: i.label,
            value: i.value,
          })),
        });
      }
    } catch(e) {
console.log(e.message)
    }
  }, [some, incomeCategorysTransform]);

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...categorysList,
    }));
  }, [some]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Введите ID",
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

  if (cards) {
    return (
      <div className="col-md-6 offset-md-3 shadow p-4">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Наименование"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <MultiSelectField
            defaultValue={data.incomeCategorys}
            options={incomeCategorysTransform}
            onChange={handleChange}
            name="incomeCategorys"
            label="Наименование дохода"
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
  }
  return "loading...";
};

export default EditIncomePageForm;
