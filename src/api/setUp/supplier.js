import { axiosGeneral } from "api/axios";

// ✅ Create Supplier
export const createSupplier = async (shop_id, supplier_data) => {
    try {
        const response = await axiosGeneral.post("supplier/create", {
            shop_id,
            ...supplier_data, // Spread the data
        });
        return response.data;
    } catch (error) {
        console.error("Create error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Supplier List — Send shop_id in request body (not query)
export const supplierList = async (shop_id, page, limit) => {
    try {
        const response = await axiosGeneral.post(
            `supplier/list`,
            { shop_id },  // 👈 Send in body
            {
                params: { page, limit },
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Supplier fetching error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ All Supplier List — Send shop_id in request body
export const supplierAllList = async (shop_id) => {
    try {
        const response = await axiosGeneral.post(
            `supplier/all_list`,
            { shop_id },  // 👈 Send in body
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Supplier fetching error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Update Supplier — Send shop_id and supplier_id in request body
export const updateSupplier = async (shop_id, supplier_id, updateData) => {
    try {
        const response = await axiosGeneral.patch(
            `supplier/update`,
            { ...updateData, shop_id, supplier_id }, // 👈 Send both shop_id + supplier_id + update data in body
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

// ✅ Soft Delete Supplier — Send shop_id and supplier_id in request body
export const deleteSupplier = async (shop_id, supplier_id) => {
    try {
        const response = await axiosGeneral.patch(
            `supplier/soft-delete`,
            { shop_id, supplier_id },  // 👈 Send in body
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
