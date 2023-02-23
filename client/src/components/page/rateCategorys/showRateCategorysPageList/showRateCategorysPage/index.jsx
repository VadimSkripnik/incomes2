import React, { useEffect, useState } from "react";
import ShowRateCategoryTable from "../../../../ui/table/showRateCategoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRateCategorysList,
  removeRateCategory,
} from "../../../../../store/rateCategorys";
import { loadRatesList, getRates } from "../../../../../store/rates";

const ShowRateCategorysPageList = () => {
  const dispatch = useDispatch();

  const [categorysAll, setCategorys] = useState([]);
  
  const categorys = useSelector((state) => state.rateCategorys.entities);
  const rates = useSelector(getRates());

  useEffect(() => {
    dispatch(loadRateCategorysList());
    dispatch(loadRatesList());
  }, []);

  useEffect(() => {
    setCategorys(categorys);
  }, [categorys]);

  const handleDelete = (categoryId) => {
    dispatch(removeRateCategory(categoryId, categorys, rates));
  };

  if (categorysAll) {
    const count = categorysAll.length;

    return (
      <div className="d-flex">
        <div className="d-flex flex-column">
          {count > 0 && (
            <ShowRateCategoryTable
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

export default ShowRateCategorysPageList;
