import React from "react";
import PropTypes from "prop-types";

const RateCategory = ({ color, sourceOfIncome }) => {
    return <span style={{backgroundColor: color}} className={"badge m-1 bg"}>{sourceOfIncome}</span>;
};

RateCategory.propTypes = {
    color: PropTypes.string.isRequired,
    sourceOfIncome: PropTypes.string.isRequired
};

export default RateCategory;
