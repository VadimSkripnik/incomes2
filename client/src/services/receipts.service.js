import httpService from "./http.service";
const receiptsEndpoint = "receipts/";

const receiptsService = {
  getReceipts: async () => {
    const { data } = await httpService.get(receiptsEndpoint);
    return data;
  },
  updateReceiptId: async (id, payload) => {
    const { data } = await httpService.patch(
      receiptsEndpoint + payload._id,
      payload
    );
    return data;
  },
  createReceipt: async (payload) => {
    const { data } = await httpService.post(receiptsEndpoint, payload);
    return data;
  },
  getReceipt: async (id) => {
    const { data } = await httpService.get(receiptsEndpoint + id);
    return data;
  },
  removeReceiptId: async (id) => {
    const { data } = await httpService.delete(receiptsEndpoint + id);
    return data;
  },
};
export default receiptsService;
