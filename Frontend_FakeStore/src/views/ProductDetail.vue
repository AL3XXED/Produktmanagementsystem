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
  
  <style scoped>
  .detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .detail-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .back-btn {
    margin-bottom: 1rem;
    background: none;
    border: none;
    color: #007b5e;
    cursor: pointer;
    font-size: 1rem;
  }
  </style>
  