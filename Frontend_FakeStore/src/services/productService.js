import axios from "axios";

const API_BASE_URL = "/api/products";

export default {
  async fetchProducts() {
    const res = await axios.get(API_BASE_URL);
    return res.data;
  },
  async createProduct(product) {
    return await axios.post(API_BASE_URL, product);
  },
  async deleteProduct(id) {
    return await axios.delete(`${API_BASE_URL}/${id}`);
  },
  async updateProduct(id, product) {
    return await axios.put(`${API_BASE_URL}/${id}`, product);
  }
};
