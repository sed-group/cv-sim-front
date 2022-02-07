<template>
  <div class="dashboard">

    <DashboardBar></DashboardBar>

    <v-navigation-drawer
        app
        permanent
    >
      <v-list class="mt-5">
        <v-list-item-group v-model="sidebar_nav_selection">

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-bookmark-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Templates</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tutorials</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <ProjectsView v-if="sidebar_nav_selection === 0"></ProjectsView>

    <h1 v-if="sidebar_nav_selection === 1" class="ma-5">Templates</h1>
    <h1 v-if="sidebar_nav_selection === 2" class="ma-5">Tutorials</h1>
    <h1 v-if="sidebar_nav_selection === 3" class="ma-5">Settings</h1>

  </div>
</template>


<script>
import ProjectsView from '@/components/projects/ProjectsView';
import DashboardBar from '@/components/DashboardBar';

export default {
  name: 'Dashboard',

  components: {
    ProjectsView,
    DashboardBar,
  },

  data: () => ({
    sidebar_nav_selection: 0,
    user: null,
  }),

  methods: {},

  mounted() {
    if (this.$store.state.User.logged_in) {
      // UserService.getMe()
      //     .then(data => {
      //       if (data) {
      //         store.dispatch('User/setActiveUser', new User(data));
      //       }
      //     });
    }
  },

};
</script>


<style scoped>

</style>

