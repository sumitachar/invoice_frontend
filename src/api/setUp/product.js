import { axiosGeneral } from "api/axios";

// ✅ Create Product
export const createProduct = async (shop_id, product_data) => {
  try {
    const response = await axiosGeneral.post("product/create", {
      shop_id,
      ...product_data, // Spread the data
    });
    return response.data;
  } catch (error) {
    console.error("Create error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ List Products — Send shop_id and category_id in request body (not query)
export const productListByCategory = async (shop_id, category_id) => {
  try {
    const response = await axiosGeneral.post(
      `product/listByCategory`,
      shop_id, category_id ,  // Send in body
      {
        params: {},
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Product fetching error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ All Products List — Send shop_id in request body with pagination
export const productAllList = async ({ shop_id, page, limit }) => {
  try {
    const response = await axiosGeneral.post(
      `product/all_list`,
      { shop_id },
      {
        params: { page, limit },
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Product fetching error:", error.response?.data || error.message);
    throw error;
  }
};





// ✅ Update Product — Send shop_id and product_code in request body
export const updateProduct = async (shop_id, product_code, updateData) => {
  try {
    const response = await axiosGeneral.patch(
      `product/update`,
      { ...updateData, shop_id, product_code }, // Send both shop_id + product_code + update data in body
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update Failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Soft Delete Product — Send shop_id and product_code in request body
export const deleteProductAPI = async (shop_id, product_code) => {
  try {
    const response = await axiosGeneral.patch(
      `product/soft-delete`,
      { shop_id, product_code },  // Send in body
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Delete Failed:", error.response?.data || error.message);
    throw error;
  }
};
