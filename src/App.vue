<template>

  <v-app>
    <SystemBar v-if="$store.state.User.loggedIn" :user="$store.state.User.user"></SystemBar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <!--<Footer :logged_in="logged_in"></Footer>-->
  </v-app>
</template>


<script>
import Footer from '@/components/Footer';
import SystemBar from '@/components/SystemBar';

import store from '@/store';
import LoginForm from '@/components/LoginForm';

import UserService from '@/services/user.service';
import User from '@/models/User';
import Snackbar from '@/components/InfoSnackbar';

export default {
  name: 'App',

  components: {
    Snackbar,
    LoginForm,
    SystemBar,
    Footer,
  },

  data: () => ({}),

  methods: {},

  mounted() {
    if (this.$store.state.User.loggedIn) {
      UserService.getMe()
          .then(data => {
            if (data) {
              store.dispatch('User/setUser', new User(data));
            }
          })
          .finally(() => {
            this.logged_in = store.state.User.loggedIn;
            this.user = store.state.User.user;
          });
    }
  },

};

</script>
