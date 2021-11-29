<template>
  <v-system-bar app height="60">

    <!-- logo -->
    <router-link :to="{ name: 'Dashboard' }" class="mr-4" >
      <v-img
          src="@/assets/logo-small.svg"
          alt="CV-S logo"
          contain
          height="40"
          width="55"
          v-ripple
          style="margin: 0;padding: 0"
      ></v-img>
    </router-link>

    <v-spacer></v-spacer>

    <LoggedInUserInfo :user="user"></LoggedInUserInfo>

  </v-system-bar>
</template>

<script>
import LoggedInUserInfo from '@/components/user/LoggedInUserInfo';

export default {
  name: 'SystemBar',

  components: {LoggedInUserInfo},

  props: ['user'],

  data: () => ({}),

  methods: {},

};
</script>

<style scoped>

</style>