import React from "react";
import style from "./index.module.scss";
import { Route, Routes } from "react-router-dom";

import IncomesList from "../../page/income/incomesList";
import CardsList from "../../page/cards/cardsList";
import RatesList from "../../page/rate/rateList";
import EditCardPage from "../../page/cards/editCardPage";
import ShowHistoryCardPageList from "../../page/cards/showHistoryCardPageList";
import ShowHistoryCardPage from "../../page/cards/showHistoryCardPageList/showHistoryCardPage";
import EditIncomePage from "../../page/income/editIncomePage";
import EditReceiptCardPage from "../../page/cards/showHistoryCardPageList/editReceiptCardPage";
import AddReceiptCardPage from "./../../page/cards/addReceiptCardPage";
import RateListId from "../../page/rate/rateListId/rateItemList";
import RateId from "../../page/rate/rateListId/rateItemList/rateId";
import AddRateId from "./../../page/rate/rateListId/addRateId";
import EditRateId from "./../../page/rate/rateListId/rateItemList/editRateId";

const MainList = () => {
  return (
    <div className={style.main_incomes}>
      <>
        <h1>MainList</h1>
        <Routes>
          <Route index element={<IncomesList />} />
          <Route path={":incomeId/editincome"} element={<EditIncomePage />} />
        </Routes>
        <Routes>
          <Route index element={<CardsList />} />
          <Route path={":cardId/editcard"} element={<EditCardPage />} />
          <Route
            path={":cardId/showhistory"}
            element={<ShowHistoryCardPageList />}
          >
            <Route index element={<ShowHistoryCardPage />} />
            <Route path={":edit"} element={<EditReceiptCardPage />} />
          </Route>
          <Route path={":cardId/addreceipt"} element={<AddReceiptCardPage />} />
        </Routes>
        <Routes>
          <Route index element={<RatesList />} />
          <Route path={":rateId/"} element={<RateListId />}>
            <Route index element={<RateId />} />
            <Route path={":editrate/editrateid"} element={<EditRateId />} />
          </Route>
          <Route path={":rateId/adddailyexpenses"} element={<AddRateId />} />
        </Routes>
      </>
    </div>
  );
};

export default MainList;
