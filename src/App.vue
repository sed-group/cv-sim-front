<template>

  <v-app>
    <SystemBar v-if="logged_in===true" :user="{username:'admin'}" @log-out="log_out"></SystemBar>

    <v-main v-if="logged_in===true">
      <router-view></router-view>
    </v-main>

    <v-main v-if="logged_in !==true">
      <LoginForm></LoginForm>
    </v-main>

    <Footer logged_in="logged_in"></Footer>
  </v-app>
</template>


<script>
import Footer from '@/components/Footer';
import SystemBar from "@/components/SystemBar";
import router from '@/router';

import AuthService from '@/services/auth.service';
import store from "@/store";
import LoginForm from "@/components/LoginForm";

export default {
  name: 'App',

  components: {
    LoginForm,
    SystemBar,
    Footer,
  },

  data: () => ({
    logged_in: store.state.User.logged_in,
  }),

  methods: {
    log_out() {
      AuthService.logout();
      router.push({name: 'Home'});
    },
  },

};

console.log(store.state.User.logged_in)
console.log('hej')
</script>
