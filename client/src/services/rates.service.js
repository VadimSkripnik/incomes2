import httpService from "./http.service";
const ratesEndpoint = "rates/";

const ratesService = {
  getRates: async () => {
    const { data } = await httpService.get(ratesEndpoint);
    return data;
  },
  updateRatesId: async (id, payload) => {
    const { data } = await httpService.patch(ratesEndpoint + id, payload);
    return data;
  },
  createRateId: async (payload) => {
    const { data } = await httpService.post(ratesEndpoint, payload);
    return data;
  },
  removeRatesId: async (id) => {
    const { data } = await httpService.delete(ratesEndpoint + id);
    return data;
  },
  getRatesId: async (id) => {
    const { data } = await httpService.get(ratesEndpoint + id);
    return data;
  },
};
export default ratesService;
