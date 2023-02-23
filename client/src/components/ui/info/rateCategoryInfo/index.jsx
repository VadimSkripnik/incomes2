import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRateCategorysList } from "../../../../store/rateCategorys";
import RateCategoryInfoTable from "../../table/rateCategoryInfoTable";

const RateCategoryInfo = () => {
  const dispatch = useDispatch();

  const rateCategoryAll = useSelector((state) => state.rateCategorys.entities);
  useEffect(() => {
    dispatch(loadRateCategorysList());
  }, []);

  if (rateCategoryAll) {
    return (
      <>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <RateCategoryInfoTable rates={rateCategoryAll} />
          </div>
        </div>
      </>
    );
  }
  return "loading...";
};

export default RateCategoryInfo;
