<template>
  <div class="confirm-dialog">

    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          :max-width="width"
          :persistent="persistent"
          @click:outside="reject"
      >
        <v-card>
          <v-card-title class="text-h5">{{ title }}</v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :color="btn_reject_clr"
                text
                @click="reject"
            >
              {{ btn_reject }}
            </v-btn>
            <v-btn
                :color="btn_confirm_clr"
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

  props: {
    title: String,
    message: String,
    btn_confirm: String,
    btn_confirm_clr: {
      default: 'primary',
      type: String,
    },
    btn_reject: String,
    btn_reject_clr: {
      default: undefined,
      type: String,
    },
    persistent: {
      default: true,
      type: Boolean,
    },
    width: {
      default: 290,
      type: Number,
    },
  },

  data: () => ({
    dialog: false,
    answer: null,
  }),

  methods: {
    open() {
      this.dialog = true;
      return new Promise(answer => {
        this.answer = answer;
      });
    },
    reject() {
      this.answer('reject');
      this.dialog = false;
    },
    confirm() {
      this.answer('confirm');
      this.dialog = false;
    },
  },

};
</script>

<style scoped>

</style>