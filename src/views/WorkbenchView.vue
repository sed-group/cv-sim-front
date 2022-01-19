<template>
  <div class="workbench">

    <v-app-bar app clipped-left clipped-right>
      <WorkbenchMenubar
          :project="project"
          :user="user"
          :checkbox_details="show_details"
          @toggle-details="show_details = !show_details"
          @manage-value-drivers="item_manager_tab = 'value-drivers'; item_manager = true"
          @manage-subprocesses="item_manager_tab = 'subprocesses'; item_manager = true"
      ></WorkbenchMenubar>
    </v-app-bar>

    <v-navigation-drawer
        app
        left
        clipped
        permanent
        color="#eeeeee"
        width="326"
    >
      <WorkbenchSidebar
          :project="project"
          @vcs-working-view="active_work_area='vcs'"
          @generic-working-view="active_work_area='generic'"
          @vcs-selected="on_vcs_selected"
          :vcs_list="vcs_list"
      ></WorkbenchSidebar>
    </v-navigation-drawer>

    <!-- CONTENT -->
    <!--    <div style="min-height: calc(100vh - 64px)">-->
    <div>
      <WorkArea
          :active_work_area="active_work_area"
          :selected_vcs="selected_vcs"
      ></WorkArea>
    </div>

    <v-navigation-drawer absolute right clipped color="#eeeeee" v-model="show_details">
      <DetailsBox @close="show_details = false"></DetailsBox>
    </v-navigation-drawer>

    <ItemManager
        :show="item_manager"
        :selected_tab="item_manager_tab"
        @close="item_manager = false"
    ></ItemManager>

  </div>
</template>


<script>

import WorkbenchMenubar from '@/components/workbench/WorkbenchMenubar';
import DetailsBox from '@/components/DetailsBox';
import WorkArea from '@/components/workbench/WorkArea';
import WorkbenchSidebar from '@/components/workbench/WorkbenchSidebar';
import SystemBar from '@/components/SystemBar';
import VCSSubprocesses from '@/components/workbench/vcs/VCSSubprocesses';
import ItemManager from '@/components/workbench/vcs/ItemManager';

import CVSProjectService from '@/services/cvs-project.service';
import CVSVCSService from '@/services/cvs-vcs.service';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';

import ValueDrivers from '@/models/ValueDrivers';
import Notification from '@/models/utils/Notification';
import Subprocesses from '@/models/Subprocesses';

export default {
  name: 'WorkbenchView',

  components: {
    ItemManager,
    VCSSubprocesses,
    WorkbenchMenubar,
    DetailsBox,
    WorkArea,
    WorkbenchSidebar,
    SystemBar,
  },

  data: () => ({
    user: null,
    project: null,
    details: false,
    active_work_area: 'vcs',

    item_manager: false,
    item_manager_tab: 'value-drivers',

    show_details: false,

    selected_vcs: {},
    vcs_list: null,
  }),

  methods: {
    async get_project() {
      CVSProjectService.get_project(this.$route.params.project_id).then(data => {
        if (!!data) {
          this.project = data;
          this.user = data.owner;
        }
      });
    },

    on_vcs_selected(id) {
      this.selected_vcs = this.vcs_list.find(obj => obj.id === id);
    },

    get_vcss() {
      const project_id = this.$route.params.project_id;
      new ValueDrivers([]).push();
      CVSVCSService.get_all_vcss(project_id).then(response => {
        if (!!response) {
          const vcss = response.chunk;
          if (!!vcss) {
            this.vcs_list = [];
            for (let i = 0; i < vcss.length; i++) {
              this.vcs_list.push(vcss[i]);
            }
            this.vcs_list.sort((a, b) => (a.id > b.id) ? 1 : -1); // sorting based on ascending id
            new ValueDrivers(this.vcs_list).push();
          } else {
            Notification.emit_standard_error_message();
          }
        }
      });
    },

    get_value_drivers() {
      ValueDrivers.clear();
      const project_id = this.$route.params.project_id;
      VCSValueDriversService.get_all(project_id)
          .catch(error => {
            console.error(error);
            new Notification(error).push();
          })
          .then(response => {
            const value_drivers = response.chunk;
            if (!!value_drivers) {
              value_drivers.sort((a, b) => (a.id > b.id) ? 1 : -1);
              new ValueDrivers(value_drivers).push();
            } else {
              Notification.emit_standard_error_message();
            }
          });
    },

    get_subprocesses() {
      Subprocesses.clear();
      const project_id = this.$route.params.project_id;
      VCSSubprocessesService.get_all(project_id)
          .catch(error => {
            console.error(error);
            new Notification(error).push();
          })
          .then(response => {
            const subprocesses = response.chunk;
            if (!!subprocesses) {
              subprocesses.sort((a, b) => (a.id > b.id) ? 1 : -1);
              new Subprocesses(subprocesses).push();
            } else {
              Notification.emit_standard_error_message();
            }
          });
    },

  },

  mounted() {
    this.get_project();
    this.get_vcss();
    this.get_value_drivers();
    this.get_subprocesses();
  },

};

</script>


<style scoped>

</style>

