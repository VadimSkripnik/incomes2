import React, { useEffect } from "react";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import RateTable from "../../../ui/table/rateTable";
import _ from "lodash";
import {
  loadRateCategorysList,
  getRateCategorys,
} from "../../../../store/rateCategorys";
import { loadDailyExpenses } from "../../../../store/dailyExpenses";
import { loadDailyExpensesLists } from "../../../../store/rates";

const RateList = () => {
  const dispatch = useDispatch();

  const categorys = useSelector(getRateCategorys());

  const rates = useSelector((state) => state.rates.dailyExpenses);
  const ratesSortBy = _.sortBy(rates, ["data"]);

  useEffect(() => {
    dispatch(loadDailyExpenses());
    dispatch(loadRateCategorysList());
    dispatch(loadDailyExpensesLists());
  }, []);

  if (rates) {
    const count = rates.length;

    return (
      <>
        {count > 0 && (
          <div className={style.main_ratesList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                {count > 0 && (
                  <RateTable categorys={categorys} rates={ratesSortBy} />
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return "loading...";
};

export default RateList;
