<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <NotificationStack></NotificationStack>
  </v-app>
</template>


<script>

import NotificationStack from '@/components/utils/NotificationStack';

export default {
  name: 'App',

  components: {
    NotificationStack,
  },

  data: () => ({}),

  methods: {},

};

</script>
