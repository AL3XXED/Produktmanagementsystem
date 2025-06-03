<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Produkt bearbeiten" : "Neues Produkt erstellen" }}</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Titel</label>
        <input id="title" v-model="form.title" required />
      </div>

      <div class="form-group">
        <label for="category">Kategorie</label>
        <input id="category" v-model="form.category" required />
      </div>

      <div class="form-group">
        <label for="price">Preis</label>
        <input id="price" type="number" v-model="form.price" min="0" required />
      </div>

      <div class="form-group">
        <label for="description">Beschreibung</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>

      <div class="form-group">
        <label for="image">Bild-URL</label>
        <input id="image" v-model="form.image" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Speichern..." : (isEdit ? "Aktualisieren" : "Erstellen") }}
      </button>

      <p v-if="success" class="success-msg">✔️ Produkt gespeichert!</p>
      <p v-if="submitError" class="error-msg">❌ {{ submitError }}</p>
    </form>
  </div>
</template>

<script>
import productService from "@/services/productService";

export default {
  props: ["id"],
  data() {
    return {
      isEdit: false,
      loading: false,
      success: false,
      submitError: null,
      form: {
        title: "",
        category: "",
        price: 0,
        description: "",
        image: "",
      },
    };
  },
  async created() {
    if (this.id) {
      this.isEdit = true;
      const products = await productService.fetchProducts();
      const product = products.find((p) => String(p.id) === this.id && p.source === "local");

      if (product) {
        this.form = {
          title: product.title,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image,
        };
      }
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.success = false;
      this.submitError = null;

      try {
        if (this.isEdit) {
          await productService.updateProduct(this.id, this.form);
        } else {
          await productService.createProduct(this.form);
        }
        this.success = true;
        setTimeout(() => this.$router.push("/"), 1000);
      } catch (err) {
        this.submitError = err.message || "Fehler beim Speichern";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
