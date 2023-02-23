import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsList, getCards } from "../../../../store/cards";
import { loadReceiptsList } from "../../../../store/receipts";
import {
  loadIncomeCategorysList,
  getIncomeCategorys,
} from "../../../../store/incomeCategorys";
import { loadRateCategorysList } from "../../../../store/rateCategorys";
import IncomesTable from "../../../ui/table/incomesTable";

const IncomesList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cards = useSelector(getCards());
  const category = useSelector(getIncomeCategorys());

  useEffect(() => {
    if (category) setIsLoading(false);
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadReceiptsList());
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
    dispatch(loadRateCategorysList());
  }, []);

  if (!isLoading && cards && category) {
    const count = cards.length;
    return (
      <>
        {count > 0 && (
          <div className={style.main_incomeList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <IncomesTable category={category} cards={cards} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return "loading...";
};
IncomesList.propTypes = {
  incomes: PropTypes.array,
};

export default IncomesList;
