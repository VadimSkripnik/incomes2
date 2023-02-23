import React from "react";
import PropTypes from "prop-types";
import Category from "./incomeCategory";

const IncomeCategorysList = ({ categorys, category }) => {
  try {
    const transformCategorys = categorys.map((el) =>
      category.find((x) => x.id === el)
    );
    return (
      <>
        {transformCategorys.at(-1)
          ? transformCategorys.map((category) => (
              <Category key={category.id} {...category} />
            ))
          : "Нет категорий доходов"}
      </>
    );
  } catch (e) {
    console.log(e.message);
  }
};

IncomeCategorysList.propTypes = {
  categorys: PropTypes.array,
  category: PropTypes.array,
};

export default IncomeCategorysList;
