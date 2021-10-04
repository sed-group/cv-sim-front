<template>
  <div class="snack-bar">

    <v-snackbar v-model="snackbar">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="emit_close_snackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>


<script>
export default {
  name: 'InfoSnackbar',
  props: ['snackbar', 'message'],
  data: () => ({}),
  methods: {
    emit_close_snackbar() {
      this.$emit('close-snackbar');
    },
  },
};
</script>


<style scoped>

</style>