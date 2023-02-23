import { createSlice } from "@reduxjs/toolkit";
import cardsService from "../services/cards.service";
import receiptsService from "../services/receipts.service";
import incomeCategorysService from "../services/incomeCategorys.service";
import rateCategorysService from "../services/rateCategorys.service";
import ratesService from "../services/rates.service";
import dailyExpensesService from "../services/dailyExpenses.service";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    entities: null,
    categorysCards: null,
    rateCategorysCards: null,
    receiptsCards: null,
    rates: null,
    dailyExpenses: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    cardsRequested: (state) => {
      state.isLoading = true;
    },
    cardsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    updateCategoryCard: (state, action) => {
      state.categorysCards = action.payload;
      state.isLoading = false;
    },
    updateRateCategory: (state, action) => {
      state.rateCategorysCards = action.payload;
      state.isLoading = false;
    },
    ratesReceived: (state, action) => {
      state.rates = action.payload;
      state.isLoading = false;
    },
    dailyExpensesReceived: (state, action) => {
      state.dailyExpenses = action.payload;
      state.isLoading = false;
    },
    removeDuplicatesIncomeCategoryIdCard: (state, action) => {
      state.entities = action.payload;
    },
    removeDuplicatesRateCategoryIdCard: (state, action) => {
      state.entities = action.payload;
    },
    updateReceiptsCard: (state, action) => {
      state.receiptsCards = action.payload;
      state.isLoading = false;
    },
    cardsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addCardItem: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    removeCardItem: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: cardsReducer, actions } = cardsSlice;
const {
  addCardItem,
  cardsRequested,
  cardsReceived,
  cardsRequestFailed,
  removeCardItem,
  updateRateCategory,
  updateReceiptsCard,
  updateCategoryCard,
  ratesReceived,
  dailyExpensesReceived,
  removeDuplicatesIncomeCategoryIdCard,
  removeDuplicatesRateCategoryIdCard,
} = actions;

export const updateReceiptsCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await receiptsService.getReceipts();
    dispatch(updateReceiptsCard(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const updateCategoryCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await incomeCategorysService.getIncomeCategorys();
    dispatch(updateCategoryCard(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const updateRateCategoryCards = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await rateCategorysService.getRateCategorys();
    dispatch(updateRateCategory(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const loadCardsList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await cardsService.getCards();
    dispatch(cardsReceived(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const loadDailyExpensesList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await dailyExpensesService.getDailyExpenses();
    dispatch(dailyExpensesReceived(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const loadRatesList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await ratesService.getRates();
    dispatch(ratesReceived(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const removeIncomeCategory = (id) => async (dispatch, getState) => {
  try {
    const cards = getState().cards.entities;
    const incomeCategorys = getState().cards.categorysCards;
    const receipts = getState().cards.receiptsCards;
    const incomesCategorysId = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].incomeCategorys.length; j++) {
        if (cards[i]._id === id) {
          incomesCategorysId.push(cards[i].incomeCategorys[j]);
        }
      }
    }

    const deleteIncomeCategory = incomeCategorys.filter(
      (e) =>
        incomesCategorysId.includes(e.id) && {
          ...e,
        }
    );

    const deleteReceipt = receipts.filter(
      (e) =>
        incomesCategorysId.includes(e.category) && {
          ...e,
        }
    );
    deleteIncomeCategory.forEach(
      async (el) => await incomeCategorysService.removeIncomeCategoryId(el._id)
    );
    deleteReceipt.forEach(
      async (el) => await receiptsService.removeReceiptId(el._id)
    );
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const removeRateCategory = (id) => async (dispatch, getState) => {
  try {
    const cards = getState().cards.entities;
    const rateCategorys = getState().cards.rateCategorysCards;
    const rates = getState().cards.rates;

    const ratesCategorysId = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards[i].rateCategorys.length; j++) {
        if (cards[i]._id === id) {
          ratesCategorysId.push(cards[i].rateCategorys[j]);
        }
      }
    }

    const deleteRateCategorys = rateCategorys.filter(
      (e) =>
        ratesCategorysId.includes(e.id) && {
          ...e,
        }
    );

    const deleteRates = rates.filter(
      (e) =>
        ratesCategorysId.includes(e.category) && {
          ...e,
        }
    );

    deleteRateCategorys.forEach(
      async (el) => await rateCategorysService.removeRateCategoryId(el._id)
    );
    deleteRates.forEach(async (el) => await ratesService.removeRatesId(el._id));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const removeDailyExpense = (id) => async (dispatch, getState) => {
  try {
    const cards = getState().cards.entities;
    const rates = getState().cards.rates;
    const dailyExpenses = getState().cards.dailyExpenses;

    const cardItem = cards.find((u) => u._id === id);

    const cardId = [cardItem.id];

    const toRemove = new Set(cardId);
    const transformDailyExpensesCardId = dailyExpenses.map((c) =>
      c.cardId.filter((el) => !toRemove.has(el))
    );

    const rateItems = rates.filter((u) => u.cardId === cardItem.id);
    const transformRateItems = rateItems.map((el) => (el = el.id));

    const toRemoveRate = new Set(transformRateItems);
    const transformDailyExpensesQuantityRate = dailyExpenses.map((c) =>
      c.quantityRate.filter((el) => !toRemoveRate.has(el))
    );

    const receipts = getState().cards.receiptsCards;
    const receiptAll = receipts.filter((el) => el.cardId !== cardItem.id);

    let incomes = receiptAll.reduce((sum, elem) => sum + elem.profit, 0);

    let lengths = dailyExpenses.length + 1;

    const removeDuplicatesCardId = dailyExpenses.map((el, i) => ({
      ...el,
      quantityRate: transformDailyExpensesQuantityRate[i],
      cardId: transformDailyExpensesCardId[i],
      balance: (incomes = incomes - el.spent),
      budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
    }));

    removeDuplicatesCardId.forEach(
      async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
    );
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const removeCard = (id) => async (dispatch, getState) => {
  try {
    const cards = getState().cards.entities;
    const content = cards.filter((card) => card._id !== id);

    dispatch(removeCardItem(content));
    await cardsService.removeCardId(id);
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const addCard =
  (category, rateCategory, data, receipt) => async (dispatch, getState) => {
    try {
      const receiptAll = getState().cards.receiptsCards;
      const dailyExpenses = getState().cards.dailyExpenses;

      let incomes =
        receiptAll.reduce((sum, elem) => sum + elem.profit, 0) +
        Number(receipt.profit);
      let lengths = dailyExpenses.length + 1;

      const newDailyExpensesAll = dailyExpenses.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      await incomeCategorysService.createIncomeCategory(category);

      await rateCategorysService.createRateCategory(rateCategory);
      await receiptsService.createReceipt(receipt);

      await cardsService.createCard({
        ...data,
        proceeds: Number(receipt.profit),
      });

      dispatch(addCardItem({ ...data, proceeds: Number(receipt.profit) }));
    } catch (error) {
      dispatch(cardsRequestFailed(error.message));
    }
  };

export const updateCategorysCards =
  (id, data, transformIncomeCategorys) => async (dispatch, getState) => {
    try {
      const toRemove = new Set(transformIncomeCategorys);
      const cards = getState().cards.entities;
      const content = getState().cards.categorysCards;
      const receipts = getState().cards.receiptsCards;

      const transformCategoryCard = cards.map((c) =>
        c.incomeCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = cards.map((el, i) => ({
        ...el,
        incomeCategorys: transformCategoryCard[i],
      }));

      const cardsIndex = removeDuplicatesCategoryId.findIndex(
        (u) => u._id === id
      );

      removeDuplicatesCategoryId[cardsIndex] = {
        ...removeDuplicatesCategoryId[cardsIndex],
        ...data,
      };

      dispatch(
        removeDuplicatesIncomeCategoryIdCard(removeDuplicatesCategoryId)
      );

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const transformCategorysSomeValue = content.map((el) =>
        transformIncomeCategorys.includes(el.id)
          ? { ...el, cardId: data.id }
          : el
      );

      const transformReceiptsSomeValue = receipts.map((e) =>
        transformIncomeCategorys.includes(e.category)
          ? { ...e, cardId: data.id, nameCardReceipt: data.nameCard }
          : e
      );

      transformCategorysSomeValue.forEach(
        async (el) =>
          await incomeCategorysService.updateIncomeCategoryId(el._id, el)
      );
      transformReceiptsSomeValue.forEach(
        async (el) => await receiptsService.updateReceiptId(el._id, el)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

export const updateRateCategorysCards =
  (id, data, transformRateCategorys) => async (dispatch, getState) => {
    try {
      const cards = getState().cards.entities;
      const toRemove = new Set(transformRateCategorys);

      const transformRateCard = cards.map((c) =>
        c.rateCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = cards.map((el, i) => ({
        ...el,
        rateCategorys: transformRateCard[i],
      }));

      const cardsIndex = removeDuplicatesCategoryId.findIndex(
        (u) => u._id === id
      );

      removeDuplicatesCategoryId[cardsIndex] = {
        ...removeDuplicatesCategoryId[cardsIndex],
        ...data,
      };

      dispatch(removeDuplicatesRateCategoryIdCard(removeDuplicatesCategoryId));

      removeDuplicatesCategoryId.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      const content = getState().cards.rateCategorysCards;

      const transformCategorysSomeValue = content.map((e) =>
        transformRateCategorys.includes(e.id) ? { ...e, cardId: data.id } : e
      );

      transformCategorysSomeValue.forEach(
        async (el) =>
          await rateCategorysService.updateRateCategoryId(el._id, el)
      );

      const rates = getState().cards.rates;

      const transformRatesSomeValue = rates.map((e) =>
        transformRateCategorys.includes(e.category)
          ? { ...e, cardId: data.id }
          : e
      );

      transformRatesSomeValue.forEach(
        async (el) => await ratesService.updateRatesId(el._id, el)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

export const getCards = () => (state) => state.cards.entities;

export const getCardById = (cardId) => (state) => {
  try {
    if (state.cards.entities) {
      return state.cards.entities.find((u) => u.id === cardId);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default cardsReducer;
