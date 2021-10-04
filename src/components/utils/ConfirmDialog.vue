<template>
  <div class="confirm-dialog">

    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="290"
          @click:outside="reject"
      >
        <v-card>
          <v-card-title class="text-h5">{{ title }}</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                @click="reject"
            >
              {{ btn_reject }}
            </v-btn>
            <v-btn
                color="red"
                text
                @click="confirm"
            >
              {{ btn_confirm }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',

  props: [
    'dialog',
    'title',
    'message',
    'btn_confirm',
    'btn_reject',
  ],

  methods: {
    reject() {
      this.$emit('reject');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>

</style>