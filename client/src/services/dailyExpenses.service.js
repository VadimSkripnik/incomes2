import httpService from "./http.service";
const dailyExpensesEndpoint = "dailyExpenses/";

const dailyExpensesService = {
  updateDailyExpense: async (id, payload) => {
    const { data } = await httpService.patch(
      dailyExpensesEndpoint + id,
      payload
    );
    return data;
  },

  getDailyExpenses: async () => {
    const { data } = await httpService.get(dailyExpensesEndpoint);
    return data;
  },
  createDailyExpenses: async (payload) => {
    const { data } = await httpService.post(dailyExpensesEndpoint, payload);
    return data;
  },

  getDailyExpenseId: async (id) => {
    const { data } = await httpService.get(dailyExpensesEndpoint + id);
    return data;
  },
};
export default dailyExpensesService;
