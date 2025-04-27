import { axiosGeneral } from "api/axios";

// ✅ Create GST Entry
export const createGst = async (gst_data) => {
    try {
        const response = await axiosGeneral.post("gst/create", gst_data);
        return response.data;
    } catch (error) {
        console.error("Create GST error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ GST List — Send shop_id in request body and pagination parameters in query
export const gstList = async (shop_id, page, limit) => {
    try {
        const response = await axiosGeneral.post(
            `gst/list`,
            { shop_id },  // 👈 Send in body
            {
                params: { page, limit },
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("GST fetching error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get a single GST Entry by category_id and shop_id
export const gstSingle = async (category_id, shop_id) => {
    try {
        const response = await axiosGeneral.post(
            `gst/single`,
            { category_id, shop_id },  // 👈 Send in body
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Single GST fetching error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Update GST Entry — Send category_id, shop_id and update data in the request body
export const updateGst = async (category_id, shop_id, updateData) => {
    try {
        const response = await axiosGeneral.patch(
            `gst/update`,
            { ...updateData, category_id, shop_id }, // 👈 Send in body
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Update GST Failed:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Soft Delete GST Entry — Send id in request body
export const softDeleteGst = async (id) => {
    try {
        const response = await axiosGeneral.patch(
            `gst/soft-delete/${id}`,
            {},
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Soft Delete GST Failed:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Hard Delete GST Entry — Send id in request body
export const hardDeleteGst = async (id) => {
    try {
        const response = await axiosGeneral.patch(
            `gst/hard-delete/${id}`,
            {},
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Hard Delete GST Failed:", error.response?.data || error.message);
        throw error;
    }
};
