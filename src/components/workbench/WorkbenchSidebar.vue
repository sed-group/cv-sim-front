<template>
  <div class="workbench-sidebar">

    <v-tabs
        v-model="tabs"
        fixed-tabs
        class="sticky-tabs"
    >
      <v-tab :key="1" @change="change_working_view(1)">VCS</v-tab>
      <v-tab :key="2" @change="change_working_view(2)">Concepts</v-tab>
      <v-tab :key="3" @change="change_working_view(3)">Elements</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">

      <v-tab-item :key="1">
        <VCSSidebarContent></VCSSidebarContent>
      </v-tab-item>

      <v-tab-item :key="2">
        <Projects2></Projects2>
      </v-tab-item>

      <v-tab-item :key="3">
        <Elements></Elements>
      </v-tab-item>

    </v-tabs-items>

  </div>
</template>


<script>
import Projects2 from '@/components/Projects2';
import Elements from '@/components/Elements';
import VCSSidebarContent from '@/components/workbench/vcs/VCSSidebarContent';

import VCS from '@/models/VCS';

export default {
  name: 'WorkbenchSidebar',

  props: [],

  components: {
    VCSSidebarContent,
    Projects2,
    Elements,
  },

  data() {
    return {
      tabs: null,
    };
  },

  methods: {
    change_working_view(i) {
      switch (i) {
        case 1:
          this.$emit('vcs-working-view');
          break;
        case 2:
        case 3:
          this.$emit('generic-working-view');
          VCS.clear_active();
          break;
      }
    },

  },
};
</script>


<style scoped>

.workbench-sidebar {
  height: 100%;
}

.sticky-tabs {
  position: sticky;
  top: 0;
  z-index: 1;
}

</style>

