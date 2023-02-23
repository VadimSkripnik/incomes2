import { createSlice } from "@reduxjs/toolkit";
import dailyExpensesService from "../services/dailyExpenses.service";
import _ from "lodash";

const dailyExpensesSlice = createSlice({
  name: "dailyExpenses",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    dailyExpensesRequested: (state) => {
      state.isLoading = true;
    },
    dailyExpensesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    dailyExpensesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addDailyExpenseItem: (state, action) => {
      state.entities = action.payload;
    },
    removeDailyExpenseItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: dailyExpensesReducer, actions } = dailyExpensesSlice;
const {
  dailyExpensesRequested,
  dailyExpensesReceived,
  dailyExpensesRequestFailed,
} = actions;

export const loadDailyExpenses = () => async (dispatch) => {
  dispatch(dailyExpensesRequested());
  try {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const getDaysInMonth = (month, year, count) => {
      const date = new Date(year, month, 1);
      const days = [];
      while (date.getMonth() === month) {
        const obj = {
          id: String((count += Date.now())),
          data: date.toLocaleDateString(),
          quantityRate: [],
          spent: 0,
          budget: 0,
          balance: 0,
          cardId: [],
        };
        days.push(obj);
        date.setDate(date.getDate() + 1);
      }
      return days;
    };

    const transformdailyExpenses = (d) => d.map((el) => (el = el.data));

    const { content } = await dailyExpensesService.getDailyExpenses();

    if (content.length === 0) {
      const dailyExpensesSortBy = _.sortBy(getDaysInMonth(month, year, 1), [
        "data",
      ]);

      dailyExpensesSortBy.forEach(
        async (el) => await dailyExpensesService.createDailyExpenses(el)
      );
    }

    if (content) {
      let flag = false;
      const dailyExpenses = [...content];
      const dailyExpensesThisMonth = getDaysInMonth(month, year, 1);
      const dailyExpensesThisMonthData = transformdailyExpenses(
        dailyExpensesThisMonth
      );
      const dailyExpensesThisMonthSlice = dailyExpensesThisMonthData.map((d) =>
        d.slice(3)
      );

      const dailyExpensesThisMonthRemoveDublicate = [
        ...new Set(dailyExpensesThisMonthSlice),
      ];

      const dailyExpensesData = transformdailyExpenses(dailyExpenses);
      const dailyExpensesSlice = dailyExpensesData.map((d) => d.slice(3));

      dailyExpensesSlice.forEach((el) =>
        dailyExpensesThisMonthRemoveDublicate.includes(el)
          ? (flag = false)
          : (flag = true)
      );
      const splicingArray = dailyExpenses.concat(dailyExpensesThisMonth);
      const splicingArraySortBy = _.sortBy(splicingArray, ["data"]);
      flag &&
        splicingArraySortBy.forEach(
          async (el) => await dailyExpensesService.createDailyExpenses(el)
        );
    }

    const dailyExpenses = [...content];
    const dailyExpensesThisMonth = getDaysInMonth(month, year, 1);
    const dailyExpensesThisMonthData = dailyExpensesThisMonth.map(
      (el) => (el = el.data)
    );

    const dailyExpensesThisMonthSlice = dailyExpensesThisMonthData.map((d) =>
      d.slice(3)
    );
    const dailyExpensesThisMonthRemoveDublicate = [
      ...new Set(dailyExpensesThisMonthSlice),
    ];
    const some = dailyExpensesThisMonthRemoveDublicate.join(" ");
    const dailyExpensesFilter = dailyExpenses.filter(
      (el) => !el.data.slice(3).indexOf(some)
    );

    dispatch(dailyExpensesReceived(dailyExpensesFilter));
  } catch (error) {
    dispatch(dailyExpensesRequestFailed(error.message));
  }
};

export const getDailyExpenses = () => (state) => state.dailyExpenses.entities;

export const getDailyExpensesId = (id) => (state, dispatch) => {
  try {
    if (state.dailyExpenses.entities) {
      return state.dailyExpenses.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default dailyExpensesReducer;











