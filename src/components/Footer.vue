<template>
  <v-footer app class="justify-center align-center">
    <small v-if="logged_in === true">We are logged in</small>
    <small v-else>We are logged out</small>
  </v-footer>
</template>


<script>
export default {
  name: 'Footer',

  props: ['logged_in'],

  data: () => ({
    the_year: (new Date).getFullYear(),
  }),
}
</script>


<style scoped>

</style>