<template>
  <div class="logged-in-user-info">

    <span v-if="!!user">logged in as: <b>{{ user.username }}</b></span>

    <!-- Account options -->
    <v-menu
        bottom
        left
        offset-y
        v-if="!!user"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item class="justify-center" @click="account_settings">
          <v-list-item-title>Account settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="log_out">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>

  </div>
</template>

<script>
import AuthService from '@/services/auth.service';
import router from '@/router';
import Notification from '@/models/utils/Notification';

export default {
  name: 'LoggedInUserInfo',

  props: ['user'],

  data: () => ({}),

  methods: {
    log_out() {
      AuthService.logout();
      router.push({name: 'Home'});
    },
    account_settings() {
      new Notification('info', 'This is not yet implemented,').push();
    },
  },

};
</script>

<style scoped>

</style>