<template>

  <v-card id="login-form">

    <v-toolbar dense flat v-if="show_close_btn">
      <v-spacer></v-spacer>
      <v-btn icon @click="emit_close_window">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form
        class="px-10"
        @submit.prevent="on_submit"
        v-model="valid"
        ref="login_form"
    >
      <v-text-field
          required
          label="E-mail"
          type="email"
          v-model="email"
      ></v-text-field>
      <v-text-field
          required
          label="Password"
          type="password"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_password ? 'text' : 'password'"
          :rules="password_rules"
          @click:append="show_password = !show_password"
          v-model="password"
      ></v-text-field>
      <v-btn type="submit" class="my-5" :disabled="!valid">Log in</v-btn>
    </v-form>

  </v-card>

</template>


<script>
import AuthService from '../services/auth.service';
import Vue from "vue";

export default {
  name: "LoginForm",

  props: ['show_close_btn'],

  data: () => ({
    show_password: false,
    email_rules: [
      v => !!v || 'Please enter an e-mail',
      v => validate_email(v) || 'Must be a valid e-mail',
    ],
    password_rules: [
      v => !!v || 'Password is required',
    ],

    email: '',
    password: '',
    valid: false,
  }),

  methods: {
    emit_close_window() {
      this.$emit('close-window');
    },
    on_submit() {
      if (this.$refs.login_form.validate()) {
        const authenticationData = {
          username: this.email,
          password: this.password,
        };
        AuthService.login(authenticationData)
            .then(() => {
              console.log("Logged in successfully")
            })
            .catch(() => {
              console.log("No soup for you")
            });
      }
    },
  },
}

function validate_email(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

</script>


<style scoped>

#login-form {
  position: absolute;
  z-index: 3;

  pointer-events: auto;
}

</style>