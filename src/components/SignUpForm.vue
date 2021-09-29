<template>
  <v-card id="signup-form" width="500">

    <v-toolbar dense flat v-if="show_close_btn">
      <v-spacer></v-spacer>
      <v-btn icon @click="emit_close_window">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form class="px-10" @submit="on_submit" v-model="valid" ref="signup_form">
      <v-col>
        <v-row>
          <v-text-field
              required
              label="First name"
              type="text"
              v-model="firstname"
              :rules="rules.firstname_rules"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
              required
              label="Last name"
              type="text"
              v-model="lastname"
              :rules="rules.lastname_rules"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
              required
              label="E-mail"
              type="email"
              v-model="email"
              :rules="rules.email_rules"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
              required
              label="Password"
              type="password"
              v-model="password"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              :rules="rules.password_rules"
              @click:append="show_password = !show_password"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
              required
              label="Confirm password"
              type="password"
              v-model="confirm_password"
              :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_confirm_password ? 'text' : 'password'"
              :rules="rules.password_confirm_rules.concat(passwords_match())"
              @click:append="show_confirm_password = !show_confirm_password"
          ></v-text-field>
        </v-row>

        <v-btn type="submit" class="my-5" :disabled="!valid">Sign up</v-btn>
      </v-col>
    </v-form>

  </v-card>
</template>


<script>
export default {
  name: "SignUpForm",

  props: ['show_close_btn'],

  data: () => ({
    show_password: false,
    show_confirm_password: false,

    // Form stuff
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    valid: false,

    // Rules
    rules: {
      firstname_rules: [
        v => !!v || 'A first name is required',
      ],
      lastname_rules: [
        v => !!v || 'A last name is required',
      ],
      email_rules: [
        v => !!v || 'An e-mail is required',
        v => validate_email(v) || 'E-mail must be valid',
      ],
      password_rules: [
        v => !!v || 'A password is required',
      ],
      password_confirm_rules: [
        v => !!v || 'You must confirm your password by typing it in again',
      ],
    }
  }),

  methods: {
    emit_close_window() {
      this.$emit('close-window');
    },
    passwords_match() {
      return () => this.password === this.confirm_password || "Passwords must match";
    },
    on_submit(e) {
      e.preventDefault();
      if (this.$refs.signup_form.validate()) {
        console.log('Tried to submit...'); // submit form to server/API here...
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

#signup-form {
  position: absolute;
  z-index: 3;

  pointer-events: auto;
}

</style>