import React from "react";
import Table from "../../../common/table";

const SummaryTable = ({ rates }) => {
  const columns = {
    data: {
      name: "Дата",
      component: (rate) => <p>{rate.data}</p>,
    },
    budget: {
      name: "Лимит",
      component: (rate) => <p>{rate.budget}</p>,
    },
    balance: {
      name: "Баланс",
      component: (rate) => <p>{rate.balance}</p>,
    },
  };
  return <Table columns={columns} data={rates} />;
};

export default SummaryTable;
