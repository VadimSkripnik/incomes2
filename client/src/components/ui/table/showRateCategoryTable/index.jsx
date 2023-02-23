import React from "react";
import PropTypes from "prop-types";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const ShowRateCategoryTable = ({ categorys, onDelete }) => {
  const columns = {
    _id: {
      path: "_id",
      name: "ID поступления",
    },
    sourceOfIncome: {
      path: "sourceOfIncome",
      name: "Источник дохода",
    },
    cardId: {
      path: "cardId",
      name: "Куда привязано",
    },
    categoryEdit: {
      component: (category) => (
        <NavLink to={`${category._id}/editratecategory`}>
          <i className="bi bi-pencil-fill"></i>
        </NavLink>
      ),
    },
    delete: {
      component: (category) => (
        <i
          className="bi bi-trash-fill"
          onClick={() => onDelete(category._id)}
        ></i>
      ),
    },
  };
  return <Table columns={columns} data={categorys} />;
};

ShowRateCategoryTable.propTypes = {
  categorys: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShowRateCategoryTable;
