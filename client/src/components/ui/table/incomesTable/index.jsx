import React from "react";
import PropTypes from "prop-types";
import CategorysList from "../../categorys/incomesCategorysList";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const IncomesTable = ({ cards, category }) => {
  const columns = {
    nameCard: {
      path: "nameCard",
      name: "Доход",
    },
    name: {
      path: "name",
      name: "Наименование",
    },
    incomeCategorys: {
      name: "Категория",
      component: (card) => (
        <CategorysList categorys={card.incomeCategorys} category={category} />
      ),
    },
    proceedCard: {
      path: "proceeds",
      name: "Общий доход",
    },
    incomesEdit: {
      component: (card) => (
        <NavLink to={`${card._id}/editincome`}>
          <i className="bi bi-pencil-fill"></i>
        </NavLink>
      ),
    },
  };
  return <Table columns={columns} data={cards} />;
};

IncomesTable.propTypes = {
  cards: PropTypes.array.isRequired,
  category: PropTypes.array,
};

export default IncomesTable;
