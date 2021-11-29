<template>
  <div class="home">

    <div class="login-container">
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col align="center">

            <!-- The logo -->
            <v-img
                src="@/assets/logo.svg"
                type="image/svg+xml"
                width="30%"
                min-width="200px"
                max-width="350px"
                class="mb-10"
            ></v-img>

            <!-- The buttons -->
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
                  <v-card v-show="show_login_form">
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
                  <v-card v-show="show_signup_form">
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

    <div class="about">
      <div class="text-h4" style="padding-bottom: 2rem">About</div>
      <div class="about-content">
        <p>
          This is the CV Simulator, which is short for "cost and value simulator" and has been developed by
          Associate Professor Massimo Panarotto at Chalmers University of Technology. The tool is the result of
          research done at the Systems Engineering Design (SED) research group which is part of the Division of
          Product Development at the Department of Industrial and Materials Science (IMS) at Chalmers.
        </p>
      </div>
    </div>

    <div class="contact">
      <div class="text-h4" style="padding-bottom: 2rem">Contact</div>
      <v-card width="550">

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              Massimo Panarotto
            </v-list-item-title>
            <v-list-item-subtitle>
              Associate Professor at the Division of Product Development, Department of Industrial and Materials
              Science
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="120" color="grey">
            <v-img
                src="https://www.chalmers.se/SiteCollectionImages/Institutioner/IMS/Profilbilder/Massimo%20Panarotto.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-text>
          <p>
            Massimo's main research focus is on developing models for determining the lifecycle value of a new
            engineering
            system. The ability to properly evaluate the value of complex systems is becoming even more critical as
            customers, stakeholders and society require the fulfillment of more sophisticated needs and
            expectations.
          </p>
          <p>
            Massimo earned his PhD in Mechanical Engineering at Blekinge Institute of Technology in 2015. This
            followed
            both a Bachelor and Master degree in Mechanical Engineering earned at University of Padua (Italy) in
            2008
            and
            2011 respectively.
          </p>

          <v-list>
            <v-list-item href="tel:+46317726785">
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>+46 (0)31-772 67 85</v-list-item-content>
            </v-list-item>

            <v-list-item href="mailto:massimo.panarotto@chalmers.se" target="_blank">
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>massimo.panarotto@chalmers.se</v-list-item-content>
            </v-list-item>

            <v-list-item href="https://www.linkedin.com/in/massimo-panarotto-7a731825" target="_blank">
              <v-list-item-icon>
                <v-icon>mdi-linkedin</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  LinkedIn
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text href="https://www.chalmers.se/en/staff/pages/massimo-panarotto.aspx" target="_blank">
            Learn More
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>

    <div class="copyright">
      <span>Copyright &copy; <span class="the-year"></span> Massimo Panarotto. All rights reserved.</span>
    </div>

  </div>
</template>


<script>
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';

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

  methods: {
    set_the_year() {
      $('.the-year').html(new Date().getFullYear());
    },
  },

  mounted() {
    this.set_the_year();
    setInterval(() => this.set_the_year(), 1000);
  },
};


</script>


<style scoped>

.home {
  height: 100vh;
  overflow-y: scroll;
  background-color: #eeeeee;
  scroll-snap-type: y mandatory;
}

.home > * {
  scroll-snap-align: start;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}

.login-container {
  position: relative;
  height: 100vh;
}

.about,
.contact,
.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.about {
  background-color: white;
  padding: 4em 3em;
}

.about-content {
  max-width: 80ch;
}

.contact {
  padding: 4em 1em;
  background-color: #0070C0;
  color: #eeeeee;
}

.copyright {
  padding: 1em;
  background-color: #eeeeee;
}

</style>