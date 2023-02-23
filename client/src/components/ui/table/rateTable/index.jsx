import React from "react";
import PropTypes from "prop-types";
import Table from "../../../common/table";
import { NavLink } from "react-router-dom";

const RatesTable = ({ rates }) => {
    const columns = {
        showRate: {
            name: "Посмотреть",
            component: (rate) => (
                <NavLink to={`${rate._id}`}>
                    <i className ="bi bi-chevron-compact-right"></i>
                </NavLink>
            )
        },
        data: {
            path: "data",
            name: "Дата"
        },
        quantityRate: {
            path: "quantityRate.length",
            name: "Количество позиций"
        },
        spent: {
            path: "spent",
            name: "Потрачено"
        },
        budget: {
            path: "budget",
            name: "Бюджет"
        },
        balance: {
            path: "balance",
            name: "Баланс"
        }
    };
    return <Table columns={columns} data={rates} />;
};

RatesTable.propTypes = {
    categorys: PropTypes.array,
    rates: PropTypes.array
};

export default RatesTable;
