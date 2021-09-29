<template>
  <v-system-bar app height="60">

    <!-- logo -->
    <router-link :to="{ name: 'ProjectView' }">
      <v-img src="@/assets/logo.png" contain max-width="50" alt="CV-S logo" v-ripple></v-img>
    </router-link>

    <v-spacer></v-spacer>

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
          <v-list-item-title>signed in as: <b>{{ user.username }}</b></v-list-item-title>
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

import router from "@/router";

export default {
  name: "SystemBar",

  props: ['user'],

  methods: {
    log_out() {
      this.$emit('log-out');
    },
  },
}
</script>

<style scoped>

</style>