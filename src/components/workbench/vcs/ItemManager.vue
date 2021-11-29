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
                         @value-driver-edited="on_value_driver_edited"
                         @value-driver-created="on_value_driver_created"></VCSValueDrivers>
      </v-tab-item>

      <v-tab-item key="subprocesses">
        <VCSSubprocesses :subprocesses="subprocesses"
                         @subprocess-edited="on_subprocess_edited"
                         @subprocess-created="on_subprocess_created"></VCSSubprocesses>
      </v-tab-item>

    </v-tabs-items>

  </v-dialog>
</template>


<script>
import VCSValueDrivers from '@/components/workbench/vcs/VCSValueDrivers';
import VCSSubprocesses from '@/components/workbench/vcs/VCSSubprocesses';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';

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
    value_drivers: undefined,
    subprocesses: undefined,

    confirm_title: '',
    confirm_msg: 'Are you sure you want to delete this project?',
  }),

  methods: {
    get_value_drivers() {
      this.value_drivers = undefined;
      const project_id = this.$route.params.project_id;
      VCSValueDriversService.get_all(project_id).then(response => {
        const value_drivers = response.chunk;
        if (!!value_drivers) {
          this.value_drivers = [];
          for (let i = 0; i < value_drivers.length; i++) {
            this.value_drivers.push(value_drivers[i]);
          }
          this.value_drivers.sort((a, b) => (a.id > b.id) ? 1 : -1);
        }
      });
    },

    get_subprocesses() {
      this.subprocesses = undefined;
      const project_id = this.$route.params.project_id;
      VCSSubprocessesService.get_all(project_id).then(response => {
        const subprocesses = response.chunk;
        if (!!subprocesses) {
          this.subprocesses = [];
          for (let i = 0; i < subprocesses.length; i++) {
            this.subprocesses.push(subprocesses[i]);
          }
          this.subprocesses.sort((a, b) => (a.id > b.id) ? 1 : -1);
        }
      });
    },

    on_value_driver_created(new_value_driver) {
      this.value_drivers.push(new_value_driver);
    },

    on_value_driver_edited(new_value_driver) {
      const index = this.value_drivers.findIndex(obj => obj.id === new_value_driver.id);
      this.value_drivers[index].name = new_value_driver.name;
    },

    on_subprocess_created(new_subprocess) {
      this.subprocesses.push(new_subprocess);
    },

    on_subprocess_edited(new_subprocess) {
      const index = this.subprocesses.findIndex(obj => obj.id === new_subprocess.id);
      this.subprocesses[index].name = new_subprocess.name;
      this.subprocesses[index].parent_process = new_subprocess.parent_process;
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

};
</script>


<style scoped>

</style>
