<template>
  <div class="home">

    <!-- NOT LOGGED IN -->
    <template v-if="!state.logged_in">

      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col align="center">

            <v-img
                src="@/assets/logo.png"
                width="30%"
                max-width="400px"
                id="the-logo"
                @click="logo_click"
                v-click-outside="{handler: click_outside_logo, include: include  }"
            ></v-img>


            <div class="btns-container included">

              <v-scale-transition>
                <v-btn
                    id="login-btn"
                    class="btns"
                    v-show="show_login_signup_btns"
                    @click="show_login_form = true"
                    width="200"
                    elevation="5"
                >Log in
                </v-btn>
              </v-scale-transition>

              <v-scale-transition>
                <v-btn
                    id="signup-btn"
                    class="btns"
                    v-show="show_login_signup_btns"
                    @click="show_signup_form = true"
                    outlined
                    width="200"
                    elevation="5"
                >Sign up
                </v-btn>
              </v-scale-transition>

              <v-fab-transition>
                <LoginForm
                    v-show="show_login_form"
                    @close-window="show_login_form = false"
                    :show_close_btn="true"
                    @log-in="log_in"
                ></LoginForm>
              </v-fab-transition>

              <v-fab-transition>
                <SignUpForm
                    v-show="show_signup_form"
                    @close-window="show_signup_form = false"
                    :show_close_btn="true"
                ></SignUpForm>
              </v-fab-transition>

            </div>


          </v-col>
        </v-row>
      </v-container>

    </template>

    <!-- LOGGED IN -->
    <template v-if="state.logged_in">Logged in</template>

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
    state: {
      logged_in: false,
    },
    show_login_signup_btns: false,
    show_login_form: false,
    show_signup_form: false,
    email_rules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password_rules: [
      v => !!v || 'Password is required',
    ],
  }),

  methods: {
    log_in() {
      this.$emit('log-in');
    },
    logo_click() {
      const logo = document.getElementById('the-logo');
      if (logo.classList.contains('active')) {
        this.unfocus_logo();
      } else {
        logo.classList.add('active');
        this.show_login_signup_btns = true;
      }
    },
    unfocus_logo() {
      const logo = document.getElementById('the-logo');
      logo.classList.remove('active');
      this.show_login_signup_btns = false;
      this.show_login_form = false;
      this.show_signup_form = false;
    },
    click_outside_logo() {
      this.unfocus_logo();
    },
    include() {
      return [document.querySelector('.included')]
    },
  },

}

</script>


<style scoped>

.home {
  background-color: #eeeeee;
  height: 100%;
  position: relative;
}

#the-logo {
  transition: filter 200ms ease-in-out;
  cursor: pointer;
}

#the-logo.active {
  filter: blur(10px);
  cursor: default;
}

.btns-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  flex-direction: column;

  pointer-events: none;
}

.btns {
  pointer-events: auto;
}


</style>

