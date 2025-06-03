<template>
  <div class="form-container">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <label for="username">Benutzername</label>
      <input id="username" v-model="username" required />

      <label for="password">Passwort</label>
      <input id="password" type="password" v-model="password" required />

      <button :disabled="loading">
        <span v-if="loading">🔄 Einloggen...</span>
        <span v-else>Login</span>
      </button>

      <p v-if="success" class="success-msg"> Erfolgreich eingeloggt!</p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import authService from "@/services/authService";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      success: false,
      error: null,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        await authService.login(this.username, this.password);
        this.success = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 800);
      } catch (e) {
        this.error = e.message || "Login fehlgeschlagen";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

