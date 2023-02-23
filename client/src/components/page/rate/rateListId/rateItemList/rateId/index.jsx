import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import RateTableId from "../../../../../ui/table/rateTableId";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRateCategorysList,
  getRateCategorys,
} from "../../../../../../store/rateCategorys";
import {
  loadRatesList,
  getRates,
  getQuantityRate,
  getRatesSum,
  removeRate,
  removeDailyExpensesQuantityRate,
} from "../../../../../../store/rates";
import {
  loadDailyExpenses,
  getDailyExpensesId,
  getDailyExpenses,
} from "../../../../../../store/dailyExpenses";
import { loadCardsList, getCards } from "../../../../../../store/cards";

const RateId = () => {
  const { rateId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rates, setRates] = useState([]);

  const ratesFilterId = useSelector((state) => state.rates.ratesFilterId);

  const categorys = useSelector(getRateCategorys());
  const ratesAll = useSelector(getRates());
  const ratesSum = useSelector(getRatesSum());
  const cards = useSelector(getCards());
  const dailyExpensesAll = useSelector(getDailyExpenses());
  const dailyExpenses = useSelector(getDailyExpensesId(rateId));

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadRatesList());
    dispatch(loadDailyExpenses());
    dispatch(loadCardsList());
  }, []);

  useEffect(() => {
    dispatch(getQuantityRate(rateId));
  }, [ratesAll]);

  useEffect(() => {
    setRates(ratesFilterId);
  }, [ratesFilterId]);

  const addDailyExpenses = () => {
    navigate(`/home/main/mainlist/${rateId}/adddailyexpenses`);
  };

  const handleDelete = (id) => {
    dispatch(
      removeDailyExpensesQuantityRate(
        id,
        dailyExpenses,
        ratesFilterId,
        cards,
        dailyExpensesAll,
        rateId
      )
    );
    dispatch(removeRate(id, ratesFilterId, dailyExpenses));
    navigate(-1);
  };

  return (
    <>
      {rates ? (
        <>
          <div className={style.main_ratesList}>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <RateTableId
                  categorys={categorys}
                  rates={rates}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
          <div>{`Всего: ${ratesSum} руб.`}</div>
          <div>
            <button className="btn btn-danger" onClick={addDailyExpenses}>
              Добавить позицию
            </button>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default RateId;
