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


    <span class="ml-5" v-if="!!projects">Showing {{ projects.length }} of {{ projects.length }} <span
        v-if="projects.length === 1">project</span><span v-else>projects</span>.</span>


    <div class="projects-layouts">
      <div class="projects-layouts-first">
        <v-expand-transition mode="in-out">
          <ProjectCards
              v-show="project_layout_selection === 0"
              :projects="projects"
              :z-index="1"
              @project-created="on_project_created"
              @project-edit="on_project_edit"
              @project-delete="on_project_delete"
          ></ProjectCards>
        </v-expand-transition>
      </div>
      <div class="projects-layouts-second">
        <v-expand-transition>
          <ProjectsList
              v-show="project_layout_selection === 1"
              :projects="projects"
              :z-index="2"
              @project-edit="on_project_edit"
              @project-delete="on_project_delete"
          ></ProjectsList>
        </v-expand-transition>
      </div>
    </div>


    <v-btn
        style="position: fixed; bottom: 2em; right: 2em"
        fab
        x-large
        color="primary"
        @click.stop="show_new_project_form = true"
        elevation="10"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>


    <ConfirmDialog
        :dialog="confirm_dialog"
        :title="confirm_title"
        :message="confirm_message"
        :btn_confirm="confirm_btn_confirm"
        :btn_reject="confirm_btn_reject"
        @confirm="on_confirm"
        @reject="on_reject"
    ></ConfirmDialog>


    <NewProjectForm
        :show_form="show_new_project_form"
        @close-dialog="on_close_dialog"
        @project-created="on_project_created($event)"
    ></NewProjectForm>


    <EditProjectForm
        :show_form="show_edit_project_form"
        :project="project_to_edit"
        @close-dialog="on_close_dialog"
    ></EditProjectForm>

  </div>
</template>


<script>
import ProjectCards from '@/components/projects/ProjectsCards';
import ProjectsList from '@/components/projects/ProjectsList';
import ConfirmDialog from '@/components/utils/ConfirmDialog';
import NewProjectForm from '@/components/projects/NewProjectForm';

import CVSProjectService from '@/services/cvs-project.service';
import EditProjectForm from '@/components/projects/EditProjectForm';

export default {
  name: 'ProjectsView',

  components: {
    EditProjectForm,
    ConfirmDialog,
    ProjectCards,
    ProjectsList,
    NewProjectForm,
  },

  props: [],

  data: () => ({
    project_layout_selection: parseInt(localStorage.getItem('project_layout_selection')) | 0,

    projects: [],
    show_new_project_form: false,
    show_edit_project_form: false,

    confirm_dialog: false,
    confirm_title: '',
    confirm_message: '',
    confirm_btn_confirm: '',
    confirm_btn_reject: '',

    project_to_delete: undefined,
    project_to_edit: {},
  }),

  methods: {
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

    on_project_created(project) {
      this.projects.push(project);
    },

    on_close_dialog() {
      this.show_new_project_form = false;
      this.show_edit_project_form = false;
    },

    on_project_edit(project) {
      this.project_to_edit = project;
      this.show_edit_project_form = true;
    },

    store_layout_selection() {
      localStorage.setItem('project_layout_selection', this.project_layout_selection.toString());
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
                $('.project-with-id-' + id).fadeOut(500, () => {
                  this.$emit('project-deleted', id);
                });
              }
            });
      } else {
        console.error('Something went wrong with the deletetion of the project.');
      }
      this.project_to_delete = undefined;
    },

    update_projects() {
      CVSProjectService.get_projects(0, 100).then((r) => {
        const projects = r.chunk;
        if (!!projects) {
          this.projects = [];
          for (let i = 0; i < projects.length; i++) {
            this.projects.push(projects[i]);
          }
          this.projects.sort((a, b) => (a.id > b.id) ? 1 : -1); // sorting based on ascending id
        }
      });
    },

  },

  mounted() {
    this.update_projects();
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

