import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadDailyExpensesLists } from "../../../../store/rates";
import SummaryTable from "../../table/summaryTable";

const Summary = () => {
  const days = new Date().toLocaleDateString();
  const [rates, setRates] = useState(false);
  const dispatch = useDispatch();

  const ratesAll = useSelector((state) => state.rates.dailyExpenses);

  useEffect(() => {
    dispatch(loadDailyExpensesLists());
  }, []);

  useEffect(() => {
    setRates(ratesAll);
  }, [ratesAll]);

  if (rates) {
    const rate = rates.filter((el) => el.data === days);

    return (
      <>
        <div className={style.main_sammary}>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h1>Состояние на текущий день</h1>
              <SummaryTable rates={rate} />
            </div>
          </div>
        </div>
      </>
    );
  }
  return "loading...";
};

export default Summary;
