import React, { useEffect, useState } from "react";
import ShowIncomeCategoryTable from "../../../../ui/table/showIncomeCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadReceiptsList,
  getReceiptsAll,
} from "../../../../../store/receipts";
import {
  loadIncomeCategorysList,
  removeIncomeCategorys,
} from "../../../../../store/incomeCategorys";
import { loadCardsList, getCards } from "../../../../../store/cards";

const ShowCategorysPageList = () => {
  const dispatch = useDispatch();
  const [categorysAll, setCategorys] = useState([]);
  const categorys = useSelector((state) => state.incomeCategorys.entities);

  const receipts = useSelector(getReceiptsAll());
  const cards = useSelector(getCards());

  useEffect(() => {
    dispatch(loadReceiptsList());
    dispatch(loadCardsList());
    dispatch(loadIncomeCategorysList());
  }, []);

  useEffect(() => {
    setCategorys(categorys);
  }, [categorys]);

  const handleDelete = (categoryId) => {
    dispatch(removeIncomeCategorys(categoryId, cards, receipts, categorys));
  };

  if (categorysAll) {
    const count = categorysAll.length;

    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          {count > 0 && (
            <ShowIncomeCategoryTable
              categorys={categorysAll}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    );
  }
  return "loading...";
};

export default ShowCategorysPageList;
