<template>
  <div class="workbench-sidebar">

    <v-tabs v-model="tabs" grow>
      <v-tab :key="1">Concepts</v-tab>
      <v-tab :key="2">Elements</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item :key="1">
        <Projects2></Projects2>
      </v-tab-item>
      <v-tab-item :key="2">
        <Elements></Elements>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>


<script>
import Projects2 from '@/components/Projects2';
import Elements from '@/components/Elements';

export default {
  name: 'WorkbenchSidebar',

  components: {
    Projects2,
    Elements,
  },

  data() {
    return {
      tabs: null,
    };
  },
};
</script>


<style scoped>

</style>