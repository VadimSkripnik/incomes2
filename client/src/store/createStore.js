import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import receiptsReducer from "./receipts";
import cardsReducer from "./cards";
import dailyExpensesReducer from "./dailyExpenses";
import incomeCategorysReducer from "./incomeCategorys";
import rateCategorysReducer from "./rateCategorys";
import ratesReducer from "./rates";

const rootReducer = combineReducers({
  cards: cardsReducer,
  receipts: receiptsReducer,
  rates: ratesReducer,
  rateCategorys: rateCategorysReducer,
  incomeCategorys: incomeCategorysReducer,
  dailyExpenses: dailyExpensesReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
