import httpService from "./http.service";
const incomeCategorysEndpoint = "incomeCategorys/";

const incomeCategorysService = {
  getIncomeCategorys: async () => {
    const { data } = await httpService.get(incomeCategorysEndpoint);
    return data;
  },
  updateIncomeCategorys: async (payload) => {
    const { data } = await httpService.patch(incomeCategorysEndpoint, payload);
    return data;
  },
  createIncomeCategory: async (payload) => {
    const { data } = await httpService.post(incomeCategorysEndpoint, payload);
    return data;
  },
  updateIncomeCategoryId: async (id, payload) => {
    const { data } = await httpService.patch(
      incomeCategorysEndpoint + id,
      payload
    );
    return data;
  },
  getIncomeCategory: async (id) => {
    const { data } = await httpService.get(incomeCategorysEndpoint + id);
    return data;
  },
  removeIncomeCategoryId: async (id) => {
    const { data } = await httpService.delete(incomeCategorysEndpoint + id);
    return data;
  },
};
export default incomeCategorysService;
