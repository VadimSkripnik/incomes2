import React from "react";
import Table from "../../../common/table";

const RateCategoryInfoTable = ({ rates }) => {
  const columns = {
    data: {
      name: "Категории расхода",
      component: (rate) => (
        <p>
          <i className="bi bi-arrow-down-circle"></i>
          {" " + rate.sourceOfIncome}
        </p>
      ),
    },
  };
  return <Table columns={columns} data={rates} />;
};

export default RateCategoryInfoTable;
