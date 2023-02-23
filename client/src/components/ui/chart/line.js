import React, { useEffect, useContext } from "react";
import UiContext from "../../../hooks/ui-context";
import _ from "lodash";
import style from "./index.module.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { loadDailyExpensesLists } from "../../../store/rates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const createOptions = (uiCtx) => ({
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
    axis: "x",
  },
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: false,
  },
  scales: {
    y: {
      grid: {
        drawOnChartArea: false,
        drawBorder: false,
      },
      ticks: {
        color: uiCtx.theme === "light" ? "#929292" : "#fff",
      },
    },
    x: {
      grid: {
        color: uiCtx.theme === "light" ? "#dddfe5" : "#26323f",
        drawBorder: false,
        borderDash: [6],
        border: false,
      },
      ticks: {
        font: {
          family: "'Mulish', sans-serif",
          size: "16px",
        },
        color: uiCtx.theme === "light" ? "#929292" : "#fff",
      },
    },
  },
});

const LineChart = () => {
  const uiCtx = useContext(UiContext);
  const dispatch = useDispatch();

  const rates = useSelector((state) => state.rates.dailyExpenses);
  const dailyExpensesSortBy = _.sortBy(rates, ["data"]);

  useEffect(() => {
    dispatch(loadDailyExpensesLists());
  }, []);

  const data = {
    labels: dailyExpensesSortBy.map((el) => el.data),
    datasets: [
      {
        label: "budget",
        backgroundColor: "rgba(51,200,99,.1)",
        borderColor: "rgba(51,200,99,.7)",
        fill: true,
        data: dailyExpensesSortBy.map(({ budget }) => budget),
        lineTension: 0.2,
      },
      {
        label: "Spent",
        backgroundColor: "rgba(51,200,99,.1)",
        borderColor: "red",
        fill: true,
        data: dailyExpensesSortBy.map(({ spent }) => spent),
        lineTension: 0.2,
      },
      {
        label: "balance",
        backgroundColor: "rgba(51,200,99,.1)",
        borderColor: "blue",
        fill: true,
        data: dailyExpensesSortBy.map(({ balance }) => balance),
        lineTension: 0.2,
      },
    ],
  };
  if (dailyExpensesSortBy) {
    return (
      <>
        <div className={style.main_chart}>
          <Line data={data} options={createOptions(uiCtx)} />
        </div>
      </>
    );
  }
  return "loading...";
};
export default LineChart;
