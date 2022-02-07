<template>
  <div class="workbench">

    <v-app-bar app clipped-left clipped-right>
      <WorkbenchMenubar
          :checkbox_details="show_details"
          @toggle-details="show_details = !show_details"
          @manage-value-drivers="item_manager_tab = 'value-drivers'; item_manager = true"
          @manage-subprocesses="item_manager_tab = 'subprocesses'; item_manager = true"
      ></WorkbenchMenubar>
    </v-app-bar>

    <v-navigation-drawer app left clipped permanent color="#eeeeee" width="326">
      <WorkbenchSidebar @vcs-working-view="active_work_area='vcs'"
                        @generic-working-view="active_work_area='generic'"></WorkbenchSidebar>
    </v-navigation-drawer>

    <!-- CONTENT -->
    <!--    <div style="min-height: calc(100vh - 64px)">-->
    <div>
      <WorkArea :active_work_area="active_work_area"></WorkArea>
    </div>

    <v-navigation-drawer absolute right clipped color="#eeeeee" v-model="show_details">
      <DetailsBox @close="show_details = false"></DetailsBox>
    </v-navigation-drawer>

    <ItemManager :show="item_manager"
                 :selected_tab="item_manager_tab"
                 @close="item_manager = false"></ItemManager>

  </div>
</template>


<script>
import WorkbenchMenubar from '@/components/workbench/WorkbenchMenubar';
import DetailsBox from '@/components/DetailsBox';
import WorkArea from '@/components/workbench/WorkArea';
import WorkbenchSidebar from '@/components/workbench/WorkbenchSidebar';
import DashboardBar from '@/components/DashboardBar';
import VCSSubprocesses from '@/components/workbench/vcs/VCSSubprocesses';
import ItemManager from '@/components/workbench/vcs/ItemManager';

import CVSProjectService from '@/services/cvs-project.service';
import CVSVCSService from '@/services/cvs-vcs.service';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';

import Notification from '@/models/utils/Notification';
import Project from '@/models/Project';
import Subprocesses from '@/models/Subprocesses';
import ValueDrivers from '@/models/ValueDrivers';
import VCS from '@/models/VCS';

export default {
  name: 'WorkbenchView',

  components: {
    ItemManager,
    VCSSubprocesses,
    WorkbenchMenubar,
    DetailsBox,
    WorkArea,
    WorkbenchSidebar,
    DashboardBar,
  },

  data: () => ({
    details: false,
    active_work_area: 'vcs',

    item_manager: false,
    item_manager_tab: 'value-drivers',

    show_details: false,
  }),

  methods: {

    get_project() {
      CVSProjectService.get_project(this.$route.params.project_id).then(data => {
        if (!!data) {
          Project.set_active(new Project(data));
        }
      });
    },

    get_vcss() {
      const project_id = this.$route.params.project_id;
      CVSVCSService.get_all_vcss(project_id).then(response => {
        if (!!response) {
          const vcss = response.chunk;
          if (!!vcss) {
            vcss.sort((a, b) => (a.id > b.id) ? 1 : -1);
            VCS.update_list(vcss);
          } else {
            Notification.emit_standard_error_message();
          }
        } else {
          Notification.emit_standard_error_message();
        }
      });
    },

    get_value_drivers() {
      ValueDrivers.clear_list();
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
              ValueDrivers.update_list(value_drivers);
            }
          });
    },

    get_subprocesses() {
      Subprocesses.clear_list();
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
              Subprocesses.update_list(subprocesses);
            }
          });
    },

  },

  computed: {
    project() {
      return this.$store.state.Project.active_project;
    },
    vcs_list() {
      return this.$store.state.VCS.vcs_list;
    },
  },

  created() {
    this.get_project();
  },

  watch: {
    project() {
      this.get_vcss();
      this.get_value_drivers();
      this.get_subprocesses();
    },
  },

};
</script>


<style scoped>

</style>

