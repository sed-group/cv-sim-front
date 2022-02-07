<template>
  <div class="logged-in-user-info">

    <span v-if="!!active_user">logged in as: <b>{{ active_user.username }}</b></span>

    <!-- Account options -->
    <v-menu v-if="!!active_user"
            bottom
            left
            offset-y>
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
import Notification from '@/models/utils/Notification';
import User from '@/models/User';
import UserService from '@/services/user.service';

export default {
  name: 'LoggedInUserInfo',

  props: [],

  data: () => ({}),

  methods: {
    log_out() {
      AuthService.logout();
    },
    account_settings() {
      new Notification('info', 'Not implemented yet.', 2000).push();
    },
    try_to_get_active_user() {
      UserService.getMe().then(user => {
        if (!!user) {
          User.set_active_user(user);
        }
      });
    },
  },

  computed: {
    active_user() {
      const user = this.$store.state.User.active_user;
      if (!user) {
        this.try_to_get_active_user();
      }
      return user;
    },
  },

  watch: {
    async active_user() {
      if (!this.active_user) {
        this.try_to_get_active_user();
      }
    },
  },

};
</script>

<style scoped>

</style>