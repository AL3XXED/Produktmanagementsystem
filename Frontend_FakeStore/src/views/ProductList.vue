<template>
  <div class="container">
    <h1 class="title">🛒 Produktübersicht</h1>
    <router-link to="/create" class="create-button">+ Neues Produkt</router-link>

    <input
      v-model="searchQuery"
      class="search"
      type="text"
      placeholder="Produkte durchsuchen..."
    />

    <div v-if="loading" class="status">Lade Produkte...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>

    <div v-else class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-wrapper"
      >
        <ProductCard :product="product" />
        <div class="admin-buttons">
          <router-link :to="`/edit/${product.id}`">✏️ Bearbeiten</router-link>
          <button @click="deleteProduct(product.id)">🗑️ Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from "@/services/productService";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredProducts() {
      const q = this.searchQuery.toLowerCase();
      return this.products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    },
  },
  async mounted() {
    try {
      this.products = await productService.fetchProducts();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async deleteProduct(id) {
      const confirmDelete = confirm(
        "Möchtest du dieses Produkt wirklich löschen?"
      );
      if (!confirmDelete) return;

      try {
        await productService.deleteProduct(id);
        this.products = this.products.filter((p) => p.id !== id);
        alert("Produkt gelöscht.");
      } catch (err) {
        alert("Fehler beim Löschen: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}
.create-button {
  display: inline-block;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: #007b5e;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
.search {
  display: block;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.admin-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
</style>
