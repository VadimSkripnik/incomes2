import React from "react";
import { Route, Routes } from "react-router-dom";
import MainList from "../components/ui/mainList";
import AddCardPage from "../components/page/cards/addCardPage";
import ShowIncomeCategorysPageList from "../components/page/incomeCategorys/showCategorysPageList";
import ShowIncomeCategorysPage from "../components/page/incomeCategorys/showCategorysPageList/showCategorysPage";
import EditCategoryPage from "../components/page/incomeCategorys/showCategorysPageList/editCategoryPage";
import ShowRateCategorysPageList from "./../components/page/rateCategorys/showRateCategorysPageList";
import ShowRateCategorysPage from "./../components/page/rateCategorys/showRateCategorysPageList/showRateCategorysPage";
import EditRateCategoryPage from "./../components/page/rateCategorys/showRateCategorysPageList/editRateCategoryPage";
import AddRateCategoryPage from "./../components/page/rateCategorys/addRateCategoryPage";
import AddIncomeCategoryPage from "./../components/page/incomeCategorys/addCategoryPage";

const Main = () => {
  return (
    <>
      <h1>Main</h1>
      <Routes>
        <Route path={"mainlist/*"} element={<MainList />} />
        <Route path={"addcard"} element={<AddCardPage />} />
        <Route
          path={"incomecategoryspage"}
          element={<ShowIncomeCategorysPageList />}
        >
          <Route index element={<ShowIncomeCategorysPage />} />
          <Route
            path={":incomeCategoryId/editincomecategory"}
            element={<EditCategoryPage />}
          />
        </Route>
        <Route path={"addincomecategory"} element={<AddIncomeCategoryPage />} />
        <Route
          path={"ratecategoryspage"}
          element={<ShowRateCategorysPageList />}
        >
          <Route index element={<ShowRateCategorysPage />} />
          <Route
            path={":rateCategoryId/editratecategory"}
            element={<EditRateCategoryPage />}
          />
        </Route>
        <Route path={"addratecategory"} element={<AddRateCategoryPage />} />
      </Routes>
    </>
  );
};

export default Main;
