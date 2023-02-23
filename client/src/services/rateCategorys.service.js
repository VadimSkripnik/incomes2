import httpService from "./http.service";
const rateCategorysEndpoint = "rateCategorys/";

const rateCategorysService = {
  getRateCategorys: async () => {
    const { data } = await httpService.get(rateCategorysEndpoint);
    return data;
  },
  updateRateCategorys: async (payload) => {
    const { data } = await httpService.patch(rateCategorysEndpoint, payload);
    return data;
  },
  createRateCategory: async (payload) => {
    const { data } = await httpService.post(rateCategorysEndpoint, payload);
    return data;
  },
  updateRateCategoryId: async (id, payload) => {
    const { data } = await httpService.patch(
      rateCategorysEndpoint + id,
      payload
    );
    return data;
  },
  getRateCategory: async (id) => {
    const { data } = await httpService.get(rateCategorysEndpoint + id);
    return data;
  },
  removeRateCategoryId: async (id) => {
    const { data } = await httpService.delete(rateCategorysEndpoint + id);
    return data;
  },
};
export default rateCategorysService;
