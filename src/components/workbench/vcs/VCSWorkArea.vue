<template>
  <v-card v-if="!!vcs === false"
          style="display: grid; place-items: center; height: calc(100vh - 64px);"
          flat>
    <v-card-subtitle>Please select or create a VCS in the menu to the left</v-card-subtitle>
  </v-card>

  <div v-else class="pb-5 px-3" style="position: relative">

    <!-- VCS meta data -->
    <div class="vcs-table-head pt-5 pb-2">
      <div class="ma-1 text-h4">{{ vcs.name }}</div>
      Years of validity:
      <v-chip style="font-size: 1.15em" outlined>{{ vcs.year_from }}</v-chip>
      -
      <v-chip style="font-size: 1.15em" outlined>{{ vcs.year_to }}</v-chip>

      <div class="vcs-description">{{ vcs.description }}</div>

      <v-divider></v-divider>
    </div>

    <VCSTable :vcs_table="vcs_table"></VCSTable>

  </div>
</template>


<script>
import VCSTable from '@/components/workbench/vcs/VCSTable';
import CVSVCSService from '@/services/cvs-vcs.service';
import Notification from '@/models/utils/Notification';

export default {
  name: 'VCSWorkArea',

  props: [],

  components: {
    VCSTable,
  },

  data() {
    return {
      vcs_table: [],
    };
  },

  methods: {

  },

  computed: {
    vcs() {
      return this.$store.state.VCS.active_vcs;
    },
  },

};
</script>


<style scoped>

.vcs-table-head {
  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: white;
}

.vcs-work-area {
  padding: 1em;
}

.vcs-description {
  width: 80%;
  max-width: 80ch;
  max-height: 10ch;

  padding: .5em .125em 1em .5em;
  margin-bottom: 1em;

  line-height: 150%;

  overflow-y: scroll;
}

</style>

