import { createSlice } from "@reduxjs/toolkit";
import incomeCategorysService from "../services/incomeCategorys.service";
import receiptsService from "../services/receipts.service";
import cardsService from "../services/cards.service";

const incomeCategorysSlice = createSlice({
  name: "incomeCategorys",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    incomeCategorysRequested: (state) => {
      state.isLoading = true;
    },
    incomeCategorysReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    incomeCategorysRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addIncomeCategoryItem: (state, action) => {
      state.entities.push(action.payload);
    },
    removeIncomeCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: incomeCategorysReducer, actions } = incomeCategorysSlice;
const {
  incomeCategorysRequested,
  incomeCategorysReceived,
  incomeCategorysRequestFailed,
  addIncomeCategoryItem,
  removeIncomeCategoryItem,
} = actions;

export const loadIncomeCategorysList = () => async (dispatch) => {
  dispatch(incomeCategorysRequested());
  try {
    const { content } = await incomeCategorysService.getIncomeCategorys();

    dispatch(incomeCategorysReceived(content));
  } catch (error) {
    dispatch(incomeCategorysRequestFailed(error.message));
  }
};

export const removeIncomeCategorys =
  (id, card, receipts, categorys) => async (dispatch, getState) => {
    dispatch(incomeCategorysRequested());

    try {
      const categoryDelete = getState().incomeCategorys.entities.filter(
        (i) => i._id !== id
      );

      dispatch(removeIncomeCategoryItem(categoryDelete));

      await incomeCategorysService.removeIncomeCategoryId(id);

      const deleteIncomeCategory = categorys.filter((e) => e._id === id);

      const cardId = deleteIncomeCategory.map((el) => el.cardId);

      const transformIncomeCategorys = deleteIncomeCategory.map(
        (el) => (el = el.id)
      );

      const toRemove = new Set(transformIncomeCategorys);

      const transformIncomeCard = card.map((c) =>
        c.incomeCategorys.filter((el) => !toRemove.has(el))
      );

      const removeDuplicatesCategoryId = card.map((el, i) => ({
        ...el,
        incomeCategorys: transformIncomeCard[i],
      }));

      const searchCardId = removeDuplicatesCategoryId.filter(
        (el) => el.id === cardId.join(" ")
      );

      await cardsService.updateCard(searchCardId[0]._id, searchCardId[0]);

      const transformReceiptsSomeValue = receipts.filter(
        (e) => e.category === transformIncomeCategorys.join(" ")
      );
      await receiptsService.removeReceiptId(transformReceiptsSomeValue[0]._id);
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const handleSubmiteEditIncomeCategorys =
  (id, receipts, data) => async (dispatch, getState) => {
    try {
      const newReceipt = receipts.map((x) =>
        x.category === data.id
          ? { ...x, sourceOfIncome: data.sourceOfIncome }
          : x
      );

      newReceipt.forEach(
        async (el) => await receiptsService.updateReceiptId(el._id, el)
      );

      const newCategory = getState().incomeCategorys.entities.map((el) =>
        id.includes(el._id) ? { ...el, ...data } : el
      );
      dispatch(incomeCategorysReceived(newCategory));

      await incomeCategorysService.updateIncomeCategoryId(id, data);
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const handleSubmiteAddIncomeCategorys =
  (cardById, data) => async (dispatch, getState) => {
    
    dispatch(incomeCategorysRequested());
    try {
      const transformCardById = cardById[0];
      const transformCardByIds = [...transformCardById.incomeCategorys, data.id];
      const transformData = { ...data, cardId: transformCardById.id };

      await incomeCategorysService.createIncomeCategory(transformData);

      await cardsService.updateCard(transformCardById._id, {
        ...cardById,
        incomeCategorys: transformCardByIds,
      });

      dispatch(addIncomeCategoryItem(transformData));
    } catch (error) {
      dispatch(incomeCategorysRequestFailed(error.message));
    }
  };

export const getIncomeCategorys = () => (state) => {
  try {
    return state.incomeCategorys.entities;
  } catch (e) {
    console.log(e.message);
  }
};

export const getIncomeCategorysId = (id) => (state) => {
  try {
    if (state.incomeCategorys.entities) {
      return state.incomeCategorys.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const incomeCategorysNewObject = () => (state) => {
  if (state.incomeCategorys.entities) {
    const newObj = state.incomeCategorys.entities.map((optionName) => ({
      value: optionName.id,
      label: optionName.sourceOfIncome,
      color: optionName.color,
      cardId: optionName.cardId,
    }));
    return newObj;
  }
};

export const incomeCategorysList = (some, newObj) => (state) => {
  if (some && newObj) {
    const someArr = JSON.parse(JSON.stringify(some));
    try {
      const filterIncomeCategoryArr = newObj.filter((i) => {
        if (someArr) {
          return someArr.incomeCategorys.includes(i.value);
        }
      });

      someArr.incomeCategorys = filterIncomeCategoryArr.map((i) => ({
        label: i.label,
        value: i.value,
      }));

      return someArr;
    } catch (e) {
      console.log(e.message);
    }
  }
};

export default incomeCategorysReducer;
