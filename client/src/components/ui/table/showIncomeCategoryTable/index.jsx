import React from "react";
import PropTypes from "prop-types";
import Table from "../../../common/table";
import { Link } from "react-router-dom";

const ShowIncomeCategoryTable = ({ categorys, onDelete, ...rest }) => {
  const columns = {
    _id: {
      path: "_id",
      name: "ID поступления",
    },
    sourceOfIncome: {
      path: "sourceOfIncome",
      name: "Источник расхода",
    },
    cardId: {
      path: "cardId",
      name: "Куда привязано",
    },
    categoryEdit: {
      component: (category) => (
        <Link to={`${category._id}/editincomecategory`}>
          <i className="bi bi-pencil-fill"></i>
        </Link>
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

ShowIncomeCategoryTable.propTypes = {
  categorys: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShowIncomeCategoryTable;
