import { createSlice } from "@reduxjs/toolkit";
import ratesService from "../services/rates.service";
import dailyExpensesService from "../services/dailyExpenses.service";
import cardsService from "../services/cards.service";
import receiptsService from "../services/receipts.service";
import _ from "lodash";

const ratesSlice = createSlice({
  name: "rates",
  initialState: {
    entities: null,
    dailyExpenses: null,
    ratesSum: null,
    ratesFilterId: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    ratesRequested: (state) => {
      state.isLoading = true;
    },
    ratesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    dailyExpensesReceived: (state, action) => {
      state.dailyExpenses = action.payload;
      state.isLoading = false;
    },
    ratesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addRatesSum: (state, action) => {
      state.ratesSum = action.payload;
      state.isLoading = false;
    },
    addRateItem: (state, action) => {
      state.ratesFilterId.push(action.payload);
      state.isLoading = false;
    },
    addRatesFilterId: (state, action) => {
      state.ratesFilterId = action.payload;
    },
    dailyExpensesRemove: (state, action) => {
      state.dailyExpenses.push(action.payload);
      state.isLoading = false;
    },
    removeRatesFilterIdItem: (state, action) => {
      state.ratesFilterId = action.payload;
    },
  },
});

const { reducer: ratesReducer, actions } = ratesSlice;
const {
  ratesRequested,
  ratesReceived,
  ratesRequestFailed,
  addRatesFilterId,
  addRatesSum,
  addRateItem,
  dailyExpensesRemove,
  removeRatesFilterIdItem,
  dailyExpensesReceived,
} = actions;

export const loadRatesList = () => async (dispatch) => {
  dispatch(ratesRequested());
  try {
    const { content } = await ratesService.getRates();
    dispatch(ratesReceived(content));
  } catch (error) {
    dispatch(ratesRequestFailed(error.message));
  }
};

export const loadDailyExpensesLists = () => async (dispatch) => {
  dispatch(ratesRequested());
  try {
    const { content } = await dailyExpensesService.getDailyExpenses();
    dispatch(dailyExpensesReceived(content));
  } catch (error) {
    dispatch(ratesRequestFailed(error.message));
  }
};

export const removeRate = (id, ratesFilterId) => async (dispatch, getState) => {
  try {
    const rateDeleteId = ratesFilterId.filter((i) => i._id !== id);

    await ratesService.removeRatesId(id);
    dispatch(removeRatesFilterIdItem(rateDeleteId));
  } catch (error) {
    dispatch(ratesRequestFailed(error.message));
  }
};

export const removeDailyExpensesQuantityRate =
  (id, dailyExpenses, ratesFilterId, cards, dailyExpensesAll, rateId) =>
  async (dispatch, getState) => {
    dispatch(ratesRequested());
    try {
      dispatch(ratesRequested());
      const rates = getState().rates.entities;
      const { content } = await receiptsService.getReceipts();

      const newCards = cards.map((el) => ({
        ...el,
        proceeds: content.reduce(
          (sum, elem) =>
            el.nameCard === elem.nameCardReceipt ? sum + elem.profit : sum,
          0
        ),
      }));

      const rateItem = ratesFilterId.find((u) => u._id === id);

      const rateIdItem = [rateItem.id];
      const cardIdItem = [rateItem.cardId];

      const toRemoveCardId = new Set(cardIdItem);
      const toRemoveRateId = new Set(rateIdItem);

      const transformDailyExpensesQuantityRate = {
        ...dailyExpenses,
        quantityRate: dailyExpenses.quantityRate.filter(
          (el) => !toRemoveRateId.has(el)
        ),
        cardId: dailyExpenses.cardId.filter((el) => !toRemoveCardId.has(el)),
      };

      const ratesFilterIds = rates.filter((r) =>
        transformDailyExpensesQuantityRate.quantityRate.includes(r.id)
      );

      const ratesSum = ratesFilterIds.reduce(
        (sum, r) => sum + r.sum * r.quantity,
        0
      );

      const obj = {
        ...transformDailyExpensesQuantityRate,
        balance:
          transformDailyExpensesQuantityRate.balance +
          transformDailyExpensesQuantityRate.spent,
        spent: ratesSum,
      };

      const rateItemSum = rateItem.sum * rateItem.quantity;

      const newCardsIncreaseCardsProceeds = cards.map((el) =>
        cardIdItem.includes(el.id)
          ? {
              ...el,
              proceeds: el.proceeds + rateItemSum,
            }
          : el
      );

      let incomes = newCards.reduce((sum, elem) => sum + elem.proceeds, 0);
      let lengths = dailyExpensesAll.length + 1;

      const transformDailyExpensesAll = dailyExpensesAll.map((el) =>
        rateId.includes(el._id)
          ? {
              ...el,
              ...obj,
            }
          : el
      );

      const newDailyExpensesAll = transformDailyExpensesAll.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      newCardsIncreaseCardsProceeds.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      dispatch(dailyExpensesRemove(newDailyExpensesAll));
    } catch (error) {
      dispatch(ratesRequestFailed(error.message));
    }
  };

export const getQuantityRate = (id) => async (dispatch, getState) => {
  try {
    const rates = getState().rates.entities;
    const { content } = await dailyExpensesService.getDailyExpenseId(id);

    const ratesFilterId = rates.filter((r) =>
      content.quantityRate.includes(r.id)
    );

    dispatch(addRatesFilterId(ratesFilterId));
    const ratesSum = ratesFilterId.reduce(
      (sum, r) => sum + r.sum * r.quantity,
      0
    );
    dispatch(addRatesSum(ratesSum));
  } catch (e) {
    console.log(e.message);
  }
};

export const updateRate =
  (rateId, data, ratesSum, dailyExpensesAll, cards, rate) =>
  async (dispatch, getState) => {
    try {
      const id = data._id;
      const rates = getState().rates.ratesFilterId;

      const result = rates.map((el) =>
        id.includes(el._id)
          ? {
              ...el,
              itemName: data.itemName,
              sum: data.sum,
              quantity: data.quantity,
            }
          : el
      );

      dispatch(addRatesFilterId(result));

      const newCardsDecreaseCardsProceeds = cards.map((el) =>
        [data.cardId].includes(el.id)
          ? {
              ...el,
              proceeds:
                el.proceeds +
                Number(rate.sum) * Number(rate.quantity) -
                Number(data.sum) * Number(data.quantity),
            }
          : el
      );

      newCardsDecreaseCardsProceeds.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const { content } = await receiptsService.getReceipts();

      const newCards = cards.map((el) => ({
        ...el,
        proceeds: content.reduce(
          (sum, elem) =>
            el.nameCard === elem.nameCardReceipt ? sum + elem.profit : sum,
          0
        ),
      }));

      let incomes = newCards.reduce((sum, elem) => sum + elem.proceeds, 0);

      let lengths = dailyExpensesAll.length + 1;

      const transformDailyExpensesAll = dailyExpensesAll.map((el) =>
        rateId.includes(el._id)
          ? {
              ...el,
              spent:
                el.spent -
                Number(rate.sum) * Number(rate.quantity) +
                Number(data.sum) * Number(data.quantity),
            }
          : el
      );

      const newDailyExpensesAll = transformDailyExpensesAll.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      await ratesService.updateRatesId(data._id, data);
    } catch (error) {
      dispatch(ratesRequestFailed(error.message));
    }
  };

export const getHandleSubmitAddRates =
  (
    rateId,
    data,
    rateCategorys,
    dailyExpenses,
    ratesSum,
    dailyExpensesAll,
    cards
  ) =>
  async (dispatch) => {
    dispatch(ratesRequested());
    try {
      const updateDailyExpenseCardIdAndQuantityRate = (cardId, elem) => {
        cardId.push(elem);
        const res = [...new Set(cardId)];
        return res;
      };

      const sum = ratesSum + Number(data.sum) * data.quantity;

      const objRate = {
        id: String(Date.now()),
        data: new Date().toLocaleDateString(),
        category: data.category,
        itemName: data.itemName,
        sourceOfRate: rateCategorys[0].sourceOfIncome,
        color: rateCategorys[0].color,
        position: "",
        sum: Number(data.sum),
        quantity: data.quantity,
        cardId: rateCategorys[0].cardId,
      };

      const { content } = await receiptsService.getReceipts();

      const newCards = cards.map((el) => ({
        ...el,
        proceeds: content.reduce(
          (sum, elem) =>
            el.nameCard === elem.nameCardReceipt ? sum + elem.profit : sum,
          0
        ),
      }));

      const newCardsDecreaseCardsProceeds = cards.map((el) =>
        [rateCategorys[0].cardId].includes(el.id)
          ? {
              ...el,
              proceeds: el.proceeds - Number(data.sum) * Number(data.quantity),
            }
          : el
      );

      newCardsDecreaseCardsProceeds.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      let incomes = newCards.reduce((sum, elem) => sum + elem.proceeds, 0);
      let lengths = dailyExpensesAll.length + 1;

      const transformDailyExpensesAll = dailyExpensesAll.map((el) =>
        rateId.includes(el._id)
          ? {
              ...el,
              cardId: updateDailyExpenseCardIdAndQuantityRate(
                dailyExpenses.cardId,
                objRate.cardId
              ),
              quantityRate: updateDailyExpenseCardIdAndQuantityRate(
                dailyExpenses.quantityRate,
                objRate.id
              ),
              spent: sum,
            }
          : el
      );

      const newDailyExpensesAll = transformDailyExpensesAll.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        balances: [incomes, el.spent],
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      await ratesService.createRateId({
        ...objRate,
        position: dailyExpenses.quantityRate.indexOf(objRate.id) + 1,
      });

      dispatch(
        addRateItem({
          ...objRate,
          position: dailyExpenses.quantityRate.indexOf(objRate.id) + 1,
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  };

export const getRateId = (id) => (state) => {
  try {
    if (state.rates.entities) {
      return state.rates.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRates = () => (state) => state.rates.entities;
export const getRatesSum = () => (state) => state.rates.ratesSum;
export const getRatesFilterId = () => (state) => state.rates.ratesFilterId;

export default ratesReducer;
