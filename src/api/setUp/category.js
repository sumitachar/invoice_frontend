import { axiosGeneral } from "api/axios"


// ✅ Create category — already correct
export const createCategory = async (category_data) => {
  try {
    const response = await axiosGeneral.post("categories/create", category_data);
    return response.data;
  } catch (error) {
    console.error("Create error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Category list — send shop_id in request body (not query)
export const catagorylist = async (shop_id, page, limit) => {
  try {
    const response = await axiosGeneral.post(
      `categories/list`,
      { shop_id },  // 👈 Send in body
      {
        params: { page, limit },
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Category fetching error:", error.response?.data || error.message);
    throw error;
  }
};

export const catagoryAlllist = async (shop_id) => {
  try {
    const response = await axiosGeneral.post(
      `categories/all_list`,
      { shop_id },  // 👈 Send in body
      {
        params: { },
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Category fetching error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update category — send shop_id in request body
export const updateCategory = async (shop_id, category_id, updateData) => {
  try {
    const response = await axiosGeneral.patch(
      `/categories/update`,
      { ...updateData, shop_id }, // 👈 Send shop_id + update data in body
      {
        params: { category_id },
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update Failed:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Soft delete category — send shop_id in body
export const deleteCategory = async (id) => {
  try {
    const response = await axiosGeneral.patch(
      `/categories/shopDelete`,
      {},  // 👈 In body
      {
        params: { id},
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Delete Failed:", error.response?.data || error.message);
    throw error;
  }
};

  
  
  