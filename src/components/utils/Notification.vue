<template>
  <v-alert :type="notification.type" border="left">
    <v-row align="start">
      <v-col class="grow">
        {{ notification.message }}
      </v-col>
      <v-col class="shrink">
        <!-- just some extra space/padding -->
      </v-col>
    </v-row>
    <div class="fraction" v-if="total !== 1">{{ index + 1 }} of {{ total }}</div>
    <v-btn class="close-btn" v-if="notification.closeable === true" icon @click="close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-alert>
</template>


<script>
export default {
  name: 'Notification',

  props: {
    notification: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },

  methods: {
    close() {
      this.$emit('close', this.notification.id);
    },
  },

  created() {
    if (this.notification.timeout > 0) {
      setTimeout(() => {
        this.close();
      }, this.notification.timeout);
    }
  },

};
</script>


<style scoped>

.fraction {
  position: absolute;
  bottom: 2px;
  right: 1em;
  font-size: 12px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

</style>

