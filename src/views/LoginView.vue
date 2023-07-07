<template>
  <div class="container p-4">
    <h1>Login</h1>
  </div>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-md-4">
          <div v-if="message_error_login > 0" class="alert alert-danger">
            <span>{{ message_error_login }}</span>
          </div>
          <div class="form-group">
            <label class="form-label">ID Car Number</label>
            <input
              type="text"
              class="form-control"
              v-model="id_card_number"
              placeholder="Fill ID Card Number"
              :class="[message_id_card_number.length > 0 ? 'is-invalid' : '']"
            />
            <div
              v-if="message_id_card_number.length > 0"
              class="invalid-feedback"
              v-html="message_id_card_number"
            ></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="text"
              class="form-control"
              v-model="password"
              placeholder="Fill Password"
              :class="[message_password.length > 0 ? 'is-invalid' : '']"
            />
            <div
              v-if="message_password.length > 0"
              class="invalid-feedback"
              v-html="message_password"
            ></div>
          </div>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col-m-4">
          <button type="submit" class="btn btn-success">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message_error_login: "",
      id_card_number: "",
      message_id_card_number: "",
      password: "",
      message_password: "",
    };
  },
  methods: {
    submit() {
      var vue = this;
      vue.message_error_login = "";
      vue.message_id_card_number = "";
      vue.message_password = "";
      var xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status === 400) {
          var response = JSON.parse(xhr.response);
          var keys = Object.keys(response);
          keys.forEach((key) => {
            var text = "";
            response[key].forEach((value) => {
              text += value + "<br/>";
            });
            vue["message_" + key] = text;
          });
        } else if (xhr.status == 401) {
          var response = JSON.parse(xhr.response);
          vue.message_error_login = response.message;
        } else if (xhr.status == 200) {
          var response = JSON.parse(xhr.response);
          localStorage.setItem("user", btoa(JSON.stringify(response)));
          vue.$router.go(); // refresh halaman
        }
      };

      xhr.open("POST", this.$apiURL + "auth/login");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(
        JSON.stringify({
          id_card_number: vue.id_card_number,
          password: vue.password,
        })
      );
    },
  },
};
</script>