// 📁 src/api/storemanage.js

import { axiosGeneral } from "api/axios";

// ✅ Create store
export const createStore = async (store_data) => {
  try {
    const response = await axiosGeneral.post("stores/create", store_data);
    return response.data;
  } catch (error) {
    console.error("Store create error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get paginated list of stores (shop_id in body, pagination in params)
export const storeList = async (shop_id, page, limit) => {
  try {
    const response = await axiosGeneral.post(
      "stores/list",
      { shop_id },
      {
        params: { page, limit },
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Store list fetch error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get all stores for a shop (non-paginated)
export const storeAllList = async (shop_id) => {
  try {
    const response = await axiosGeneral.post(
      "stores/all_list",
      { shop_id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("All stores fetch error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update store (shop_id in body, store_id in query param)
export const updateStore = async (shop_id, store_id, updateData) => {
  try {
    const response = await axiosGeneral.patch(
      "stores/update",
      { ...updateData, shop_id },
      {
        params: { store_id },
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Store update error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Soft delete store (store id in query param)
export const deleteStore = async (shop_id,store_id) => {
  try {
    const response = await axiosGeneral.patch(
      "stores/delete",
      {shop_id},
      {
        params: { store_id },
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Store delete error:", error.response?.data || error.message);
    throw error;
  }
};
