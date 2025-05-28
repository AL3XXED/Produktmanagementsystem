<template>
    <div class="form-container">
      <h2>{{ isEdit ? 'Produkt bearbeiten' : 'Neues Produkt erstellen' }}</h2>
  
      <form @submit.prevent="submitForm">
        <label>Titel</label>
        <input v-model="form.title" required />
  
        <label>Kategorie</label>
        <input v-model="form.category" required />
  
        <label>Preis</label>
        <input v-model.number="form.price" type="number" step="0.01" required />
  
        <label>Beschreibung</label>
        <textarea v-model="form.description" required></textarea>
  
        <label>Bild-URL</label>
        <input v-model="form.image" type="url" required />
  
        <button type="submit">{{ isEdit ? 'Aktualisieren' : 'Erstellen' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import productService from "@/services/productService";
  
  export default {
    props: ["id"],
    data() {
      return {
        form: {
          title: "",
          category: "",
          price: 0,
          description: "",
          image: "",
        },
        isEdit: false,
      };
    },
    async created() {
      if (this.id) {
        this.isEdit = true;
        const products = await productService.fetchProducts();
        const product = products.find((p) => String(p.id) === this.id);
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
        try {
          if (this.isEdit) {
            await productService.updateProduct(this.id, this.form);
            alert("Produkt aktualisiert!");
          } else {
            await productService.createProduct(this.form);
            alert("Produkt erstellt!");
          }
          this.$router.push("/");
        } catch (err) {
          alert("Fehler: " + err.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 2rem auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-top: 1rem;
  }
  input, textarea {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  button {
    margin-top: 1.5rem;
    background-color: #007b5e;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>
  