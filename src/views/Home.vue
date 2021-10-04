<template>
  <div class="home">

    <!-- NOT LOGGED IN -->
    <v-container fill-height fluid>
      <v-row justify="center">
        <v-col align="center">

          <v-img
              src="@/assets/logo.png"
              width="30%"
              max-width="400px"
              id="the-logo"
          ></v-img>

          <v-col align="center">
            <v-btn
                id="login-btn"
                class="btns"
                @click="show_login_form = !show_login_form; show_signup_form = false"
                width="200"
                elevation="3"
                color="primary"
            >Log in
            </v-btn>

            <v-col align="center">
              <v-btn
                  id="signup-btn"
                  class="btns"
                  @click="show_signup_form = !show_signup_form; show_login_form = false"
                  width="200"
                  elevation="3"
                  outlined
              >Sign up
              </v-btn>
            </v-col>

            <div class="form-container">
              <v-scale-transition>
                <v-card class="d-inline-block" v-show="show_login_form">
                  <LoginForm
                      :show_close_btn="true"
                      @close="show_login_form = false"
                      v-show="show_login_form"
                  ></LoginForm>
                </v-card>
              </v-scale-transition>
            </div>

            <div class="form-container">
              <v-scale-transition>
                <v-card class="d-inline-block" v-show="show_signup_form">
                  <SignUpForm
                      :show_close_btn="true"
                      @close="show_signup_form = false"
                      v-show="show_signup_form"
                  ></SignUpForm>
                </v-card>
              </v-scale-transition>
            </div>

          </v-col>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>


<script>
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

export default {
  name: 'Home',

  components: {
    SignUpForm,
    LoginForm,
  },

  data: () => ({
    show_login_form: false,
    show_signup_form: false,
  }),

  methods: {},

}

</script>


<style scoped>

.home {
  background-color: #eeeeee;
  height: 100%;
  position: relative;
}

.form-container {
  position: absolute;
  inset: 0;
  z-index: 9999;

  display: grid;
  place-items: center;

  pointer-events: none;
}

.form-container > * {
  pointer-events: auto;
}

</style>

