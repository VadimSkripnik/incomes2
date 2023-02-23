import React from "react";
import Table from "../../../common/table";

const SummaryTable = ({ incomes }) => {
  const columns = {
    data: {
      name: "Категории дохода",
      component: (income) => (
        <p>
          <i className="bi bi-arrow-up-circle"></i>
          {" " + income.sourceOfIncome}
        </p>
      ),
    },
  };
  return <Table columns={columns} data={incomes} />;
};

export default SummaryTable;
