<template>
  <div class="form-container">
    <h2>{{ isEdit ? "Produkt bearbeiten" : "Neues Produkt erstellen" }}</h2>

    <form @submit.prevent="submitForm">
      <div v-for="(field, key) in form" :key="key" class="form-group">
        <label :for="key">{{ labels[key] }}</label>
        <input
          v-if="key !== 'description'"
          :type="key === 'price' ? 'number' : 'text'"
          :id="key"
          v-model="form[key]"
          :class="{ invalid: errors[key] }"
        />
        <textarea
          v-else
          :id="key"
          v-model="form[key]"
          :class="{ invalid: errors[key] }"
        />
        <small v-if="errors[key]" class="error-msg">{{ errors[key] }}</small>
      </div>

      <button :disabled="loading">
        {{ loading ? "Speichere..." : isEdit ? "Aktualisieren" : "Erstellen" }}
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
      errors: {},
      labels: {
        title: "Titel",
        category: "Kategorie",
        price: "Preis (€)",
        description: "Beschreibung",
        image: "Bild-URL",
      },
    };
  },
  async created() {
    if (this.id) {
      this.isEdit = true;
      const all = await productService.fetchProducts();
      const product = all.find((p) => String(p.id) === this.id && p.source === "local");

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
    validate() {
      const e = {};
      if (!this.form.title) e.title = "Titel erforderlich";
      if (!this.form.category) e.category = "Kategorie erforderlich";
      if (this.form.price === null || this.form.price < 0) e.price = "Preis muss ≥ 0 sein";
      if (!this.form.image) e.image = "Bild-URL erforderlich";
      return e;
    },
    async submitForm() {
      this.errors = this.validate();
      if (Object.keys(this.errors).length > 0) return;

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