<template>
  <div class="dashboard">

    <SystemBar
        :user="user"
    ></SystemBar>

    <v-navigation-drawer
        app
        permanent
    >
      <v-list class="mt-5">
        <v-list-item-group v-model="sidebar_nav_selection">

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-if="outline">mdi-view-dashboard-outline</v-icon>
              <v-icon v-else>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-if="outline">mdi-bookmark-multiple-outline</v-icon>
              <v-icon v-else>mdi-bookmark-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Templates</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-if="outline">mdi-alert-circle-outline</v-icon>
              <v-icon v-else>mdi-alert-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Issues</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-if="outline">mdi-cog-outline</v-icon>
              <v-icon v-else>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <v-layout justify-center class="mt-16">
        <v-btn @click="outline = !outline">Toggle outline</v-btn>
      </v-layout>
    </v-navigation-drawer>

    <ProjectsView v-if="sidebar_nav_selection === 0"></ProjectsView>

    <h1 v-if="sidebar_nav_selection === 1" class="ma-5">Templates</h1>
    <h1 v-if="sidebar_nav_selection === 2" class="ma-5">Issues</h1>
    <h1 v-if="sidebar_nav_selection === 3" class="ma-5">Settings</h1>
    <About v-if="this.$route.name === 'About'"></About>

  </div>
</template>


<script>

import ProjectsView from '@/components/projects/ProjectsView';
import SystemBar from '@/components/SystemBar';

import UserService from '@/services/user.service';
import store from '@/store';
import User from '@/models/User';
import About from '@/views/About';

export default {
  name: 'Dashboard',

  components: {
    About,
    ProjectsView,
    SystemBar,
  },

  data: () => ({
    sidebar_nav_selection: 0,
    user: null,
    outline: true,
  }),

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
            this.user = store.state.User.user;
          });
    }
  },
};

</script>


<style scoped>

</style>

