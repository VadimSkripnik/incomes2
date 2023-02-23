import httpService from "./http.service";
const cardsEndpoint = "cards/";

const cardsService = {
  createCard: async (payload) => {
    const { data } = await httpService.post(cardsEndpoint, payload);
    return data;
  },
  updateCard: async (id, payload) => {
    const { data } = await httpService.patch(cardsEndpoint + id, payload);
    return data;
  },
  updateCards: async (id, payload) => {
    const { data } = await httpService.patch(cardsEndpoint + id, payload);
    return data;
  },
  getCards: async () => {
    const { data } = await httpService.get(cardsEndpoint);
    return data;
  },
  getCard: async (id) => {
    const { data } = await httpService.get(cardsEndpoint + id);
    return data;
  },
  removeCardId: async (id) => {
    const { data } = await httpService.delete(cardsEndpoint + id);
    return data;
  },
};
export default cardsService;
