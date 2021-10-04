<template>
  <v-system-bar app height="60">

    <!-- logo -->
    <router-link :to="{ name: 'Dashboard' }" class="mr-4">
      <v-img src="@/assets/logo.png" contain max-width="50" alt="CV-S logo" v-ripple></v-img>
    </router-link>

    <v-btn :to="{ name:'About' }" exact text small>About</v-btn>
    <v-btn :to="{ name:'Help' }" exact text small>Help</v-btn>
    <v-btn :to="{ name:'Contact' }" exact text small>Contact</v-btn>

    <v-spacer></v-spacer>

    <span>logged in as: <b v-if="user">{{ user.username }}</b></span>

    <!-- Account options -->
    <v-menu
        bottom
        left
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item disabled>
          <v-list-item-title>signed in as: <b v-if="user">{{ user.username }}</b></v-list-item-title>
        </v-list-item>
        <v-list-item link class="justify-center">
          <v-list-item-title>Account settings</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="log_out">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-system-bar>
</template>

<script>

import AuthService from '@/services/auth.service';
import router from '@/router';

export default {
  name: 'SystemBar',

  props: ['user'],

  data: () => ({}),

  methods: {
    log_out() {
      AuthService.logout();
      router.push({name: 'Home'});
    },
  },

};
</script>

<style scoped>

</style>