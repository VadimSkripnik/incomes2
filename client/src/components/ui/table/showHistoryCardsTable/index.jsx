import React from "react";
import PropTypes from "prop-types";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const ShowHistoryCardsTable = ({
  receipts,
  onDelete,
  onSort,
  selectedSort,
}) => {
  const columns = {
    data: {
      path: "data",
      name: "Дата поступления",
    },
    sourceOfIncome: {
      path: "sourceOfIncome",
      name: "Источник дохода",
    },
    nameCardReceipt: {
      path: "nameCardReceipt",
      name: "Куда поступило",
    },
    profit: {
      path: "profit",
      name: "Сколько поступило",
    },
    cardEdit: {
      component: (card) => (
        <NavLink to={`${card._id}`}>
          <i className="bi bi-pencil-fill"></i>
        </NavLink>
      ),
    },
    delete: {
      component: (card) => (
        <i className="bi bi-trash-fill" onClick={() => onDelete(card._id)}></i>
      ),
    },
  };
  return (
    <Table
      columns={columns}
      data={receipts}
      onSort={onSort}
      selectedSort={selectedSort}
    />
  );
};

ShowHistoryCardsTable.propTypes = {
  receipts: PropTypes.array,
  onDelete: PropTypes.func,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
};

export default ShowHistoryCardsTable;
