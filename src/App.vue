<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        Vaccination Platforms
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapase"
        data-bs-target="navbarHeader"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
          <li class="nav-item">
            <a @click="logout()" class="nav-link" style="cursor: pointer"
              >Logout</a
            >
          </li>
          <li>
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section>
    <RouterView :message_success_post="message_success_post" />
  </section>
</template>


<style scoped></style>

<script>
export default {
  // Fungsi mounted di pangggil ketika semua tampilan hatmlnya di render
  // dan akan mengisi var user yang ada di dalam di data
  mounted() {
    this.initUser();
    this.checkSuccessMessage();
  },

  // Fungsi watch ketika ada perubahahn langsung otomatis ada actionnya
  watch: {
    $route() {
      this.$nextTick(this.initUser);
    },
  },

  data() {
    return {
      message_success_post: "",
      user: null,
    };
  },
  methods: {
    checkSuccessMessage() {
      const message = localStorage.getItem("loginSuccessMessage");
      if (message) {
        this.message_success_post = message;
        localStorage.removeItem("loginSuccessMessage");
      }
    },

    initUser() {
      if (localStorage.getItem("user") !== null) {
        this.user = JSON.parse(atob(localStorage.getItem("user")));
      }
      // fungsi atob() mengubah kembali string yang di enskripsi dengan md5
      // menjadi bentuk semula yaitu string, dan diubah ke dalam bentuk json
      // menggunakan fungsi JSON.parse()
    },

    // fungsi logout
    logout() {
      var vue = this;
      vue.message_success_post = "";
      var xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status == 401) {
          localStorage.removeItem("user");
          vue.user = {};
          this.$router.go();
        } else if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          vue.message_success_post = response.message;
          setTimeout(() => {
            localStorage.removeItem("user");
            vue.user = {};
            this.$router.go();
          }, 2000);
        }
      };

      xhr.open(
        "POST",
        this.$apiURL + "auth/logout?token=" + this.user.data.token
      );
      xhr.send(null);
    },
  },
};
</script>
