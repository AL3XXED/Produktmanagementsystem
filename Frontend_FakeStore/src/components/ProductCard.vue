<template>
  <router-link :to="`/product/${product.id}`" class="card-link">
    <div class="product-card">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-price">€{{ product.price.toFixed(2) }}</p>
      <p class="product-category">📂 {{ product.category }}</p>
      <p class="product-description">{{ product.description }}</p>
      <span
        class="product-source"
        :class="{
          local: product.source === 'local',
          fakestore: product.source === 'fakestore',
        }"
      >
        {{ product.source }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;
}

.card-link:hover {
  transform: scale(1.02);
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.product-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.product-price {
  color: #007b5e;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.product-category {
  font-size: 0.9rem;
  color: #666;
}

.product-description {
  font-size: 0.9rem;
  margin: 0.5rem 0;
  flex-grow: 1;
}

.product-source {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
}

.product-source.local {
  background-color: #d1fae5;
  color: #065f46;
}

.product-source.fakestore {
  background-color: #e0f2fe;
  color: #0369a1;
}
</style>
