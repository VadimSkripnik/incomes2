import React from "react";
import PropTypes from "prop-types";

const IncomeCategory = ({ color, sourceOfIncome }) => {
    return <span style={{backgroundColor: color}} className={"badge m-1 bg"}>{sourceOfIncome}</span>;
};

IncomeCategory.propTypes = {
    color: PropTypes.string.isRequired,
    sourceOfIncome: PropTypes.string.isRequired
};

export default IncomeCategory;
