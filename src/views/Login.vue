<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col align="center">

        <v-card class="d-inline-block">
          <v-tabs v-model="tab" centered class="pb-4">
            <v-tabs-slider></v-tabs-slider>
            <v-tab :key="1">Log in</v-tab>
            <v-tab :key="2">Sign up</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">

            <v-tab-item :key="1">
              <LoginForm></LoginForm>
            </v-tab-item>

            <v-tab-item :key="2">
              <SignUpForm></SignUpForm>
            </v-tab-item>

          </v-tabs-items>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

export default {
  name: 'Login',
  components: {
    SignUpForm,
    LoginForm,
  },
  data: () => ({
    tab: 1, // 0 -> login, 1 -> sign up
  }),
  methods: {},
  mounted() {
    this.tab = (this.$route.name === 'LogIn') ? 0 : 1;
  },
};

</script>


<style scoped>

</style>