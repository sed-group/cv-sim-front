<template>
  <v-dialog
      v-model="show"
      style="position: relative"
      width="700"
      @click:outside="$emit('close')"
  >
    <v-app-bar flat>
      <v-app-bar-title>Item manager</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-tabs v-model="tab" fixed-tabs>
      <v-tab key="value-drivers">Value drivers</v-tab>
      <v-tab key="subprocesses">Subprocesses</v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items v-model="tab">

      <v-tab-item key="value-drivers">
        <VCSValueDrivers :value_drivers="value_drivers"
                         :loading_anim="loading.value_drivers"
                         @value-driver-created="on_value_driver_created"
                         @value-driver-edited="on_value_driver_edited"
                         @value-driver-deleted="on_value_driver_deleted"></VCSValueDrivers>
      </v-tab-item>

      <v-tab-item key="subprocesses">
        <VCSSubprocesses :subprocesses="subprocesses"
                         :loading_anim="loading.subprocesses"
                         @subprocess-created="on_subprocess_created"
                         @subprocess-edited="on_subprocess_edited"
                         @subprocess-deleted="on_subprocess_deleted"></VCSSubprocesses>
      </v-tab-item>

    </v-tabs-items>

  </v-dialog>
</template>


<script>
import VCSValueDrivers from '@/components/workbench/vcs/VCSValueDrivers';
import VCSSubprocesses from '@/components/workbench/vcs/VCSSubprocesses';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';
import ValueDrivers from '@/models/ValueDrivers';
import Subprocesses from '@/models/Subprocesses';

export default {
  name: 'ItemManager',

  components: {
    VCSSubprocesses,
    VCSValueDrivers,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    selected_tab: {
      type: String,
      default: 'value-drivers',
    },
  },

  data: () => ({
    tab: 0,
    loading: {
      subprocesses: true,
      value_drivers: true,
    },
  }),

  methods: {
    get_value_drivers() {
      this.loading.value_drivers = true;
      ValueDrivers.clear();
      const project_id = this.$route.params.project_id;
      VCSValueDriversService.get_all(project_id)
          .catch(error => {
            this.loading.value_drivers = false;
            console.error(error);
            new Notification(error).push();
          })
          .then(response => {
            this.loading.value_drivers = false;
            const value_drivers = response.chunk;
            if (!!value_drivers) {
              value_drivers.sort((a, b) => (a.id > b.id) ? 1 : -1);
              new ValueDrivers(value_drivers).push();
            }
          });
    },

    get_subprocesses() {
      this.loading.subprocesses = true;
      Subprocesses.clear();
      const project_id = this.$route.params.project_id;
      VCSSubprocessesService.get_all(project_id)
          .catch(error => {
            this.loading.subprocesses = false;
            console.error(error);
            new Notification(error).push();
          })
          .then(response => {
            this.loading.subprocesses = false;
            const subprocesses = response.chunk;
            if (!!subprocesses) {
              subprocesses.sort((a, b) => (a.id > b.id) ? 1 : -1);
              new Subprocesses(subprocesses).push();
            }
          });
    },

    on_value_driver_created(new_value_driver) {
      const value_drivers = this.value_drivers.slice();
      value_drivers.push(new_value_driver);
      new ValueDrivers(value_drivers).push();
    },
    on_value_driver_edited(new_value_driver) {
      const value_drivers = this.value_drivers.slice();
      const index = value_drivers.findIndex(item => item.id === new_value_driver.id);
      value_drivers[index].name = new_value_driver.name;
      new ValueDrivers(value_drivers).push();
    },
    on_value_driver_deleted(id) {
      new ValueDrivers(this.value_drivers.filter(item => item.id !== id)).push();
    },

    on_subprocess_created(new_subprocess) {
      const subprocesses = this.subprocesses.slice();
      subprocesses.push(new_subprocess);
      new Subprocesses(subprocesses).push();
    },
    on_subprocess_edited(new_subprocess) {
      const subprocesses = this.subprocesses.slice();
      const index = subprocesses.findIndex(item => item.id === new_subprocess.id);
      subprocesses[index].name = new_subprocess.name;
      subprocesses[index].parent_process = new_subprocess.parent_process;
      new Subprocesses(subprocesses).push();
    },
    on_subprocess_deleted(id) {
      new Subprocesses(this.subprocesses.filter(item => item.id !== id)).push();
    },

  },

  watch: {
    show(value) {
      if (value === true) { // only on opening the dialog (not on close)
        this.get_value_drivers();
        this.get_subprocesses();
      }
    },
    selected_tab(value) {
      this.tab = (value === 'subprocesses') ? 1 : 0;
    },
  },

  computed: {
    value_drivers() {
      return this.$store.state.value_drivers;
    },
    subprocesses() {
      return this.$store.state.subprocesses;
    },
  },

};
</script>


<style scoped>

</style>
