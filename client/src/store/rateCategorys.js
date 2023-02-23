import { createSlice } from "@reduxjs/toolkit";
import rateCategorysService from "../services/rateCategorys.service";
import cardsService from "../services/cards.service";
import ratesService from "../services/rates.service";

const rateCategorysSlice = createSlice({
  name: "rateCategorys",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    rateCategorysRequested: (state) => {
      state.isLoading = true;
    },
    rateCategorysReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    rateCategorysRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addRateCategoryItem: (state, action) => {
      console.log(action.payload);
      state.entities.push(action.payload);
    },
    updateRateCategoryItem: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    removeRateCategoryItem: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: rateCategorysReducer, actions } = rateCategorysSlice;
const {
  rateCategorysRequested,
  rateCategorysReceived,
  rateCategorysRequestFailed,
  addRateCategoryItem,
  removeRateCategoryItem,
  updateRateCategoryItem,
} = actions;

export const loadRateCategorysList = () => async (dispatch) => {
  dispatch(rateCategorysRequested());
  try {
    const { content } = await rateCategorysService.getRateCategorys();
    dispatch(rateCategorysReceived(content));
  } catch (error) {
    dispatch(rateCategorysRequestFailed(error.message));
  }
};

export const removeRateCategory =
  (id, categorys, rates) => async (dispatch, getState) => {
    dispatch(rateCategorysRequested());
    try {
      const categoryDelete = getState().rateCategorys.entities.filter(
        (i) => i._id !== id
      );

      dispatch(removeRateCategoryItem(categoryDelete));
      await rateCategorysService.removeRateCategoryId(id);

      const deleteRateCategory = categorys.filter((e) => e._id === id);

      const cardId = deleteRateCategory.map((el) => el.cardId);

      const transformRateCategorys = deleteRateCategory.map(
        (el) => (el = el.id)
      );

      const { content } = await cardsService.getCards();

      const toRemove = new Set(transformRateCategorys);
      const transformCategoryCard = content.map((c) =>
        c.rateCategorys.filter((el) => !toRemove.has(el))
      );
      const removeDuplicatesCategoryId = content.map((el, i) => ({
        ...el,
        rateCategorys: transformCategoryCard[i],
      }));

      const searchCardId = removeDuplicatesCategoryId.filter(
        (el) => el.id === cardId.join(" ")
      );

      await cardsService.updateCard(searchCardId[0]._id, searchCardId[0]);

      const transformRatesSomeValue = rates.filter(
        (e) => e.category === transformRateCategorys.join(" ")
      );

      await ratesService.removeRatesId(transformRatesSomeValue[0]._id);
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const addRateCategory =
  (cardById, data) => async (dispatch, getState) => {
    try {
      const transformCardById = cardById[0];
      const transformCardByIds = [...transformCardById.rateCategorys, data.id];
      const transformData = { ...data, cardId: transformCardById.id };

      await rateCategorysService.createRateCategory(transformData);
      await cardsService.updateCard(transformCardById._id, {
        ...cardById,
        rateCategorys: transformCardByIds,
      });
      dispatch(addRateCategoryItem(transformData));
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const updateRateCategory =
  (data, rates, id) => async (dispatch, getState) => {
    dispatch(rateCategorysRequested());
    try {
      const rateCategorys = getState().rateCategorys.entities;

      const rateCategorysIndex = rateCategorys.findIndex((i) => i._id === id);
      const updateCategorysArr = rateCategorys.map((el) =>
        id.includes(el._id)
          ? { ...rateCategorys[rateCategorysIndex], ...data }
          : el
      );
      await rateCategorysService.updateRateCategoryId(id, data);
      dispatch(updateRateCategoryItem(updateCategorysArr));

      const filterRates = rates.filter((el) => el.category === data.id);

      const transformRateCategorys = filterRates.map(
        (el) => (el = el.category)
      );

      const newRates = rates.map((el) =>
        transformRateCategorys.includes(el.category)
          ? { ...el, sourceOfRate: data.sourceOfIncome }
          : el
      );

      newRates.forEach(
        async (el) => await ratesService.updateRatesId(el._id, el)
      );
    } catch (error) {
      dispatch(rateCategorysRequestFailed(error.message));
    }
  };

export const getRateCategorysNewObject = () => (state) => {
  if (state.rateCategorys.entities) {
    const newObj = state.rateCategorys.entities.map((optionName) => ({
      value: optionName.id,
      label: optionName.sourceOfIncome,
      color: optionName.color,
      cardId: optionName.cardId,
    }));
    return newObj;
  }
};

export const getRateCategorysList = (some, newObj) => (state) => {
  if (some && newObj) {
    const someArr = JSON.parse(JSON.stringify(some));
    try {
      const filterRateCategoryArr = newObj.filter((i) => {
        if (someArr) {
          return someArr.rateCategorys.includes(i.value);
        }
      });

      someArr.rateCategorys = filterRateCategoryArr.map((i) => ({
        label: i.label,
        value: i.value,
      }));

      return someArr;
    } catch (e) {
      console.log(e.message);
    }
  }
};

export const getRateCategorys = () => (state) => {
  try {
    if (state.rateCategorys.entities) {
      return state.rateCategorys.entities;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRateCategoryId = (id) => (state) => {
  try {
    if (state.rateCategorys.entities) {
      return state.rateCategorys.entities.find((u) => u._id === id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default rateCategorysReducer;
