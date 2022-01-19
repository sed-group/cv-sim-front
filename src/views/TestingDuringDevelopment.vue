<template>

  <div>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <div v-if="loading" class="fill-height d-flex justify-center align-center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </div>

      <v-list v-else dense nav>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-btn @click="loading = !loading">Toggle loading</v-btn>

  </div>

</template>


<script>

import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

export default {
  name: 'TestingDuringDevelopment',

  components: {
    LoadingAnimaiton,
  },

  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard'},
        {title: 'Photos', icon: 'mdi-image'},
        {title: 'About', icon: 'mdi-help-box'},
      ],
      loading: true,
    };
  },

};

</script>


<style scoped>

</style>