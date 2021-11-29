<template>

    <VCSWorkArea
        v-if="active_work_area === 'vcs'"
        :vcs="selected_vcs"
    ></VCSWorkArea>

    <GenericWorkArea
        v-else-if="active_work_area === 'generic'"
    ></GenericWorkArea>

</template>


<script>

import VCSWorkArea from '@/components/workbench/vcs/VCSWorkArea';
import GenericWorkArea from '@/components/workbench/GenericWorkArea';

export default {
  name: 'WorkArea',

  props: [
    'active_work_area',
    'selected_vcs',
  ],

  components: {
    GenericWorkArea,
    VCSWorkArea,
  },

  data() {
    return {};
  },
};

</script>


<style scoped>

</style>

