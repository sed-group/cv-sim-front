<template>
  <div class="projects-view">

    <v-toolbar flat>
      <v-toolbar-title class="text-h5">Your projects</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn-toggle
          v-model="project_layout_selection"
          v-on:change="store_layout_selection"
          mandatory
          dense
      >
        <v-btn>
          <v-icon dense>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>

    <div class="projects-layouts">
      <div class="projects-layouts-first">
        <v-expand-transition mode="in-out">
          <ProjectCards
              v-show="project_layout_selection === 0"
              :projects="projects"
              :z-index="1"
          ></ProjectCards>
        </v-expand-transition>
      </div>
      <div class="projects-layouts-second">
        <v-expand-transition>
          <ProjectsList
              v-show="project_layout_selection === 1"
              :projects="projects"
              :z-index="2"
              @project-delete="on_project_delete"
          ></ProjectsList>
        </v-expand-transition>
      </div>
    </div>

    <ConfirmDialog
        :dialog="confirm_dialog"
        :title="confirm_title"
        :message="confirm_message"
        :btn_confirm="confirm_btn_confirm"
        :btn_reject="confirm_btn_reject"
        @confirm="on_confirm"
        @reject="on_reject"
    ></ConfirmDialog>

  </div>
</template>


<script>
import ProjectCards from '@/components/projects/ProjectsCards';
import ProjectsList from '@/components/projects/ProjectsList';
import CVSProjectService from '@/services/cvs-project.service';
import ConfirmDialog from '@/components/utils/ConfirmDialog';

export default {
  name: 'ProjectsView',

  components: {
    ConfirmDialog,
    ProjectCards,
    ProjectsList,
  },

  props: ['projects'],

  data: () => ({
    project_layout_selection: parseInt(localStorage.getItem('project_layout_selection')) | 0,

    confirm_dialog: false,
    confirm_title: '',
    confirm_message: '',
    confirm_btn_confirm: '',
    confirm_btn_reject: '',
    project_to_delete: undefined,
  }),

  methods: {
    store_layout_selection() {
      localStorage.setItem('project_layout_selection', this.project_layout_selection.toString());
    },

    on_project_delete(project) {
      this.project_to_delete = project;
      this.confirm_title = 'Delete project?';
      this.confirm_message = 'Are you sure you want to delete this project?';
      this.confirm_btn_confirm = 'Delete';
      this.confirm_btn_reject = 'Cancel';
      this.confirm_dialog = true;
    },

    on_confirm() {
      this.delete_project();
      this.confirm_dialog = false;
    },

    on_reject() {
      this.project_to_delete = undefined;
      this.confirm_dialog = false;
    },

    delete_project() {
      if (!!this.project_to_delete) {
        const id = this.project_to_delete.id;
        CVSProjectService.delete_project(id)
            .catch(error => {
              console.error(error);

            })
            .then(data => {
              if (data === true) {
                $('#project-with-id-' + id).fadeOut(500);
              }
            });
      } else {
        console.error('Something went wrong with the deletetion of the project.');
      }
      this.project_to_delete = undefined;
    },

  },
};

</script>


<style scoped>

.projects-layouts {
  position: relative;
}

.projects-layouts-first,
.projects-layouts-second {
  position: absolute;
}

.projects-layouts-second {
  position: relative;
}

</style>

