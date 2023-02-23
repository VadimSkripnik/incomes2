import { createSlice } from "@reduxjs/toolkit";
import receiptsService from "../services/receipts.service";
import cardsService from "../services/cards.service";
import dailyExpensesService from "../services/dailyExpenses.service";

const receiptsSlice = createSlice({
  name: "receipts",
  initialState: {
    entities: null,
    showHistoryCardId: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    receiptsRequested: (state) => {
      state.isLoading = true;
    },
    receiptsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    showHistoryCardIdReceived: (state, action) => {
      state.showHistoryCardId = action.payload;
      state.isLoading = false;
    },
    addShowHistoryCardIdReceived: (state, action) => {
      state.showHistoryCardId.push(action.payload);
    },
    updateEntities: (state, action) => {
      state.entities = [...state.entities, ...action.payload];
      state.isLoading = false;
    },
    updateAddShowHistoryCardIdReceived: (state, action) => {
      state.showHistoryCardId = [...state.showHistoryCardId, ...action.payload];
      state.isLoading = false;
    },
    receiptsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addReceiptsItem: (state, action) => {
      state.entities.push(action.payload);
    },
    removeReceiptsItem: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    removeShowHistoryCardIdReceived: (state, action) => {
      state.showHistoryCardId = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: receiptsReducer, actions } = receiptsSlice;
const {
  receiptsRequested,
  receiptsReceived,
  receiptsRequestFailed,
  addReceiptsItem,
  showHistoryCardIdReceived,
  removeReceiptsItem,
  removeShowHistoryCardIdReceived,
  addShowHistoryCardIdReceived,
  updateAddShowHistoryCardIdReceived,
} = actions;

export const loadReceiptsList = () => async (dispatch) => {
  try {
    const { content } = await receiptsService.getReceipts();
    dispatch(receiptsReceived(content));
  } catch (error) {
    dispatch(receiptsRequestFailed(error.message));
  }
};

export const loadShowHistoryCardId = (card, cardId) => async (dispatch) => {
  try {
    const { content } = await receiptsService.getReceipts();

    const receiptCards = content.filter((c) => c.cardId === card.id);

    dispatch(receiptsReceived(receiptCards));
    dispatch(showHistoryCardIdReceived(receiptCards));
  } catch (error) {
    dispatch(receiptsRequestFailed(error.message));
  }
};

export const removeReceipt =
  (receiptId, cardId, cards, dailyExpensesAll) =>
  async (dispatch, getState) => {
    dispatch(receiptsRequested());
    try {
      const receipts = getState().receipts.showHistoryCardId;

      const { content } = await receiptsService.getReceipts();
      const receiptsAllFilter = content.filter(
        (receipt) => receipt._id !== receiptId
      );
      const deleteReceipt = receipts.filter(
        (receipt) => receipt._id !== receiptId
      );

      dispatch(removeShowHistoryCardIdReceived(deleteReceipt));
      dispatch(removeReceiptsItem(deleteReceipt));

      const newCards = cards.map((el) =>
        cardId.includes(el.id)
          ? {
              ...el,
              proceeds: deleteReceipt.reduce(
                (sum, elem) => sum + elem.profit,
                0
              ),
            }
          : el
      );

      newCards.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      let incomes = receiptsAllFilter.reduce(
        (sum, elem) => sum + elem.profit,
        0
      );
      let lengths = dailyExpensesAll.length + 1;

      const newDailyExpensesAll = dailyExpensesAll.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      await receiptsService.removeReceiptId(receiptId);
    } catch (error) {
      dispatch(receiptsRequestFailed(error.message));
    }
  };

export const handleSubmiteIncome =
  (cardId, data, dailyExpensesAll, cards, receipts, card) =>
  async (dispatch, getState) => {
    try {
      const { content } = await receiptsService.getReceipts();

      dispatch(addShowHistoryCardIdReceived(data));
      dispatch(addReceiptsItem(data));

      await receiptsService.createReceipt(data);

      const newCardsDecreaseCardsProceeds = cards.map((el) =>
        [data.cardId].includes(el.id)
          ? {
              ...el,
              proceeds:
                receipts.reduce(
                  (sum, elem) =>
                    el.nameCard === elem.nameCardReceipt
                      ? sum + elem.profit
                      : sum,
                  0
                ) + data.profit,
            }
          : el
      );

      const addContent = [...content, data];

      newCardsDecreaseCardsProceeds.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      let incomes = addContent.reduce((sum, elem) => sum + elem.profit, 0);
      let lengths = dailyExpensesAll.length + 1;

      const newDailyExpensesAll = dailyExpensesAll.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      newDailyExpensesAll.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );
    } catch (error) {
      dispatch(receiptsRequestFailed(error.message));
    }
  };

export const handleSubmitReceipt =
  (edit, data, cards) => async (dispatch, getState) => {
    dispatch(receiptsRequested());
    try {
      const transformData = ({ profit, ...object }) => ({
        profit: Number(profit),
        ...object,
      });

      const { content } = await dailyExpensesService.getDailyExpenses();

      const updateReceipts = getState().receipts.showHistoryCardId.map((e) =>
        data._id.includes(e._id)
          ? {
              ...e,
              ...transformData(data),
            }
          : e
      );

      dispatch(updateAddShowHistoryCardIdReceived(updateReceipts));

      const receiptsAll = getState().receipts.entities;

      const newReceiptsAll = receiptsAll.map((el) =>
        edit.includes(el._id)
          ? {
              ...el,
              profit: Number(data.profit),
            }
          : el
      );

      let incomes = newReceiptsAll.reduce((sum, elem) => sum + elem.profit, 0);
      let lengths = content.length + 1;

      const dailyExpenses = content.map((el) => ({
        ...el,
        balance: (incomes = incomes - el.spent),
        budget: Number(((incomes - el.spent) / --lengths).toFixed(2)),
      }));

      dailyExpenses.forEach(
        async (el) => await dailyExpensesService.updateDailyExpense(el._id, el)
      );

      const newCards = cards.map((el) =>
        data.cardId.includes(el.id)
          ? {
              ...el,
              proceeds: newReceiptsAll.reduce(
                (sum, elem) =>
                  el.nameCard === elem.nameCardReceipt
                    ? sum + Number(elem.profit)
                    : sum,
                0
              ),
            }
          : el
      );

      newCards.forEach(
        async (el) => await cardsService.updateCards(el._id, el)
      );

      await receiptsService.updateReceiptId(edit, transformData(data));
    } catch (error) {
      dispatch(receiptsRequestFailed(error.message));
    }
  };

export const getReceipts = () => (state) => state.receipts.entities;

export const getReceiptsAll = () => (state) => state.receipts.entities;

export const takeReceipt = (id) => (state) => {
  if (state.receipts.showHistoryCardId) {
    let receiptId = {};
    state.receipts.showHistoryCardId.filter(
      (el) => el._id === id && (receiptId = el)
    );
    return receiptId;
  }
};

export default receiptsReducer;
