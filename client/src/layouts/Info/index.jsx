import React from "react";
import Line from "../../components/ui/chart/line";
import Summary from "../../components/ui/info/summary";
import IncomeCategoryInfo from "../../components/ui/info/incomeCategoryInfo/index";
import RateCategoryInfo from "../../components/ui/info/rateCategoryInfo/index";
import style from "./index.module.scss";

const Info = () => {
  return (
    <>
      <h1>Info</h1>
      <div className="chart">
        <Line />
        <Summary />
        <div className={style.main_info}>
          <IncomeCategoryInfo />
          <RateCategoryInfo />
        </div>
      </div>
    </>
  );
};

export default Info;
