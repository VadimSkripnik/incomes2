import React from "react";
import PropTypes from "prop-types";
import CategorysList from "../../rateCategory/rateCategorysList";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const CardsTable = ({ cards, rateCategory, onDelete }) => {
  const columns = {
    nameCard: {
      path: "nameCard",
      name: "Источник дохода",
    },
    proceedCard: {
      path: "proceeds",
      name: "Общий доход",
    },
    rateCategorys: {
      name: "Категория",
      component: (card) => (
        <CategorysList categorys={card.rateCategorys} category={rateCategory} />
      ),
    },
    showHistoryId: {
      component: (card) => (
        <NavLink to={`${card.id}/showhistory`}>
          <i className="bi bi-clock-history"></i>
        </NavLink>
      ),
    },
    cardEdit: {
      component: (card) => (
        <NavLink to={`${card._id}/editcard`}>
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
  return <Table columns={columns} data={cards} />;
};

CardsTable.propTypes = {
  rateCategory: PropTypes.array,
  cards: PropTypes.array,
  onDelete: PropTypes.func,
};

export default CardsTable;
