import axiosInstance from "./axiosInstance";

const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post("products", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.put(`products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export default {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
