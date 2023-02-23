import React from "react";
import PropTypes from "prop-types";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const RatesTableId = ({ rates, onDelete, categorys }) => {
  const columns = {
    position: {
      path: "position",
      name: "№",
    },
    itemName: {
      path: "itemName",
      name: "Наименование",
    },
    category: {
      path: "category",
      name: "Категория",
    },
    sum: {
      path: "sum",
      name: "Сумма",
    },
    quantity: {
      path: "quantity",
      name: "Кол-во",
    },
    rateEdit: {
      component: (rate) => (
        <NavLink to={`${rate._id}/editrateid`}>
          <i className="bi bi-pencil-fill"></i>
        </NavLink>
      ),
    },

    delete: {
      component: (rate) => (
        <i className="bi bi-trash-fill" onClick={() => onDelete(rate._id)}></i>
      ),
    },
  };
  return <Table columns={columns} data={rates} />;
};

RatesTableId.propTypes = {
  categorys: PropTypes.array,
  rates: PropTypes.array,
  days: PropTypes.array,
  onDelete: PropTypes.func,
};

export default RatesTableId;
