<template>
    <div class="detail">
      <button @click="$router.back()" class="back-btn">← Zurück</button>
  
      <div v-if="loading">Lade Produkt...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="detail-card">
        <img :src="product.image" :alt="product.title" />
        <h1>{{ product.title }}</h1>
        <p><strong>Preis:</strong> €{{ product.price.toFixed(2) }}</p>
        <p><strong>Kategorie:</strong> {{ product.category }}</p>
        <p>{{ product.description }}</p>
        <p><strong>Quelle:</strong> {{ product.source }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import productService from "@/services/productService";
  
  export default {
    props: ["id"],
    data() {
      return {
        product: null,
        loading: true,
        error: null,
      };
    },
    async created() {
      try {
        const products = await productService.fetchProducts();
        this.product = products.find((p) => String(p.id) === this.id);
        if (!this.product) throw new Error("Produkt nicht gefunden.");
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  