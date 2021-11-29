<template>
  <div class="login-form">

    <v-toolbar dense flat v-if="show_close_btn">
      <v-spacer></v-spacer>
      <v-btn icon @click="emit_close">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form
        class="px-10 pb-5"
        @submit.prevent="on_submit"
        v-model="valid"
        ref="login_form"
    >
      <v-text-field
          required
          label="Username"
          type="text"
          v-model="email"
          :rules="rules.username"
      ></v-text-field>
      <!--<v-text-field-->
      <!--    required-->
      <!--    label="E-mail"-->
      <!--    type="email"-->
      <!--    v-model="email"-->
      <!--    :rules="rules.email"-->
      <!--</v-text-field>-->
      <v-text-field
          required
          label="Password"
          type="password"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_password ? 'text' : 'password'"
          :rules="rules.password"
          @click:append="show_password = !show_password"
          v-model="password"
      ></v-text-field>

      <v-row justify="center">
        <v-btn type="submit" class="my-5" :disabled="!valid" align="center">Log in</v-btn>
      </v-row>

    </v-form>

  </div>
</template>


<script>
import AuthService from '../services/auth.service';

export default {
  name: 'LoginForm',

  props: {
    show_close_btn: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    show_password: false,
    rules: {
      username: [
        v => !!v || 'Please enter a username',
      ],
      email: [
        v => !!v || 'Please enter an e-mail',
        v => validate_email(v) || 'Must be a valid e-mail',
      ],
      password: [
        v => !!v || 'Password is required',
      ],
    },

    email: '',
    password: '',
    valid: false,
  }),

  methods: {
    emit_close() {
      this.$emit('close');
    },
    on_submit() {
      if (this.$refs.login_form.validate()) {
        AuthService.login({username: this.email, password: this.password})
            .then(() => {
              const redirect_path = sessionStorage.getItem('redirectPath');
              if (!!redirect_path) {
                this.$router.replace(redirect_path);
                sessionStorage.removeItem('redirectPath');
              } else {
                this.$router.replace({name: 'Dashboard'});
              }
            })
            .catch(error => {
              console.log(error);
              console.log('No soup for you');
              /*handle errors*/
            });
      }
    },
  },
};

function validate_email(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

</script>


<style scoped>

</style>