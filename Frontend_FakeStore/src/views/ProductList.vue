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
      <div class="product-wrapper"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <ProductCard :product="product" />
        <div class="admin-buttons">
          <router-link
            v-if="product.source === 'local'":to="`/edit/${product.id}`">✏️ Bearbeiten</router-link>
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


