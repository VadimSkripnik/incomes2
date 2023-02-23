import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectField from "../../../common/form/selectField";
import TextField from "../../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsList, getCards } from "../../../../store/cards";
import { addRateCategory } from "../../../../store/rateCategorys";

const AddRateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardId, setCardsId] = useState("");
  const [cardById, setCardById] = useState();

  const cardsAll = useSelector(getCards());

  useEffect(() => {
    dispatch(loadCardsList());
  }, []);

  const [data, setData] = useState({
    id: String(Date.now()),
    sourceOfIncome: "",
    color:
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7),
    cardId: "",
  });

  useEffect(() => {
    if (cardsAll) {
      const cardsList = cardsAll.map((cardsName) => ({
        label: cardsName.nameCard,
        value: cardsName._id,
      }));
      setCards(cardsList);
    }
  }, [cardsAll]);

  useEffect(() => {
    if (cardId) {
    const cardByIds = cardsAll.filter((el) => el._id === cardId);
    setCardById(cardByIds);
    }
  }, [cardId]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setCardsId((prev) => (prev = target.value));
  };

  useEffect(() => {
    if (cards) setIsLoading(false);
  }, [cards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRateCategory(cardById, data));

    navigate("/home/main/ratecategoryspage", { replace: true });
  };

  return (
    <div className="col-md-6 offset-md-3 shadow p-4">
      {!isLoading && cards.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Название категории"
            name="sourceOfIncome"
            onChange={handleChange}
          />
          <SelectField
            label="Название категории"
            defaultOption="Choose..."
            options={cards}
            name="cardId"
            onChange={handleChange}
            value={data.cardId}
          />
          <button
            type="submit"
            disabled={!cardById}
            className="btn btn-primary w-100 mx-auto"
          >
            Обновить
          </button>
        </form>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default AddRateCategory;
