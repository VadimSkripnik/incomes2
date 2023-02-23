import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import CardsTable from "../../../ui/table/cardsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCardsList,
  removeIncomeCategory,
  removeRateCategory,
  removeDailyExpense,
  removeCard,
  updateCategoryCards,
  updateReceiptsCards,
  updateRateCategoryCards,
  loadRatesList,
  loadDailyExpensesList,
} from "../../../../store/cards";
import {
  loadRateCategorysList,
  getRateCategorys,
} from "../../../../store/rateCategorys";
import { loadIncomeCategorysList } from "../../../../store/incomeCategorys";

const CardsList = () => {
  const dispatch = useDispatch();
  const [cardsAll, setCardsAll] = useState([]);

  const cards = useSelector((state) => state.cards.entities);
  const rateCategory = useSelector(getRateCategorys());

  useEffect(() => {
    dispatch(loadCardsList());
    dispatch(updateCategoryCards());
    dispatch(loadIncomeCategorysList());
    dispatch(loadRateCategorysList());
    dispatch(updateReceiptsCards());
    dispatch(updateRateCategoryCards());
    dispatch(loadRatesList());
    dispatch(loadDailyExpensesList());
  }, []);

  useEffect(() => {
    setCardsAll(cards);
  }, [cards]);

  const handleDelete = (cardId) => {
    dispatch(removeDailyExpense(cardId));
    dispatch(removeIncomeCategory(cardId));
    dispatch(removeRateCategory(cardId));
    dispatch(removeCard(cardId));
  };

  if (cardsAll && rateCategory) {
    const count = cardsAll.length;
    return (
      <>
        {count > 0 && (
          <div className={style.main_cardsList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <CardsTable
                  rateCategory={rateCategory}
                  cards={cardsAll}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return "loading...";
};

export default CardsList;
