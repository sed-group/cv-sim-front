<template>
  <div class="notification-stack">
    <Notification
        v-for="(notification, index) in notifications" v-if="index < 4"
        :notification="notification"
        :key="notification.id"
        :class="'notification-with-id' + notification.id"
        @close="close_notification"
        :index="index"
        :total="notifications.length"
    ></Notification>
  </div>
</template>


<script>
import Notification from './Notification.vue';

export default {
  name: 'NotificationStack',

  components: {
    Notification,
  },

  methods: {
    close_notification(id) {
      const $notification = $('.notification-with-id' + id);
      $notification.css({
        transition: 'transform 200ms ease',
        transform: 'translateX(-100%)',
      });
      $notification.fadeOut(200, () => {
        this.$store.dispatch('removeNotification', id);
      });
    },
  },

  computed: {
    notifications() {
      return this.$store.state.notifications;
    },
  },
};
</script>


<style scoped>

.notification-stack {
  position: fixed;
  bottom: 1rem;
  left: 1.5rem;
  z-index: 999;

  width: 450px;
}

</style>

