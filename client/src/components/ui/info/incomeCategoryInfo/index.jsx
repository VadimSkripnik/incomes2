import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIncomeCategorysList } from "../../../../store/incomeCategorys";
import IncomeCategoryInfoTable from "../../table/incomeCategoryInfoTable";

const IncomeCategoryInfo = () => {
  const dispatch = useDispatch();

  const incomeCategoryAll = useSelector(
    (state) => state.incomeCategorys.entities
  );

  useEffect(() => {
    dispatch(loadIncomeCategorysList());
  }, []);

  if (incomeCategoryAll) {
    return (
      <>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <IncomeCategoryInfoTable incomes={incomeCategoryAll} />
          </div>
        </div>
      </>
    );
  }
  return "loading...";
};

export default IncomeCategoryInfo;
