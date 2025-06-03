<template>
    <nav class="navbar">
      <div class="nav-left">
        <router-link class="logo" to="/"> FakeStore</router-link>
      </div>
  
      <div class="nav-right">
        <span v-if="isLoggedIn">Hallo, {{ username }}!</span>
        <router-link v-if="isLoggedIn" to="/create">Produkt hinzufügen</router-link>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  import authService from "@/services/authService";
  
  export default {
    computed: {
      isLoggedIn() {
        return authService.isLoggedIn();
      },
      username() {
        return authService.getUser() || "Nutzer";
      }
    },
    methods: {
      logout() {
        authService.logout();
        // Axios Header nach reload sicher entfernen:
        location.reload(); 
      }
    }
  };
  </script>
  