import { BASE_URL } from "../Utils/config";

export const endpoints = {
    getAllSupplier: `${BASE_URL}/supplier`,
    createSupplier: `${BASE_URL}/supplier`,
    getActiveSupplier: `${BASE_URL}/supplier/activeSupplier`,
    getAllItems: `${BASE_URL}/items`,
    createItems: `${BASE_URL}/items`,
    createOrder:`${BASE_URL}/order/create`,
    getAllOrders:`${BASE_URL}/order/getorders`,



};
