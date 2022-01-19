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

    <!--<span class="ml-5" v-if="!!projects">Showing {{ projects.length }} of {{ projects.length }} <span
        v-if="projects.length === 1">project</span><span v-else>projects</span>.</span>-->


    <div class="projects-layouts">
      <div class="projects-layouts-first">
        <v-expand-transition mode="in-out">
          <ProjectCards
              v-show="project_layout_selection === 0"
              :projects="projects"
              :z-index="1"
              @project-created="on_project_created"
              @project-edit="on_project_edit"
              @project-delete="delete_project"
              @open-project-form="show_new_project_form = true"
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
              @project-delete="delete_project"
          ></ProjectsList>
        </v-expand-transition>
      </div>
    </div>


    <v-tooltip left v-if="project_layout_selection === 1" v-model="show_tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            style="position: fixed; bottom: 2em; right: 2em"
            fab
            x-large
            color="primary"
            @click.stop="show_new_project_form = true"
            elevation="10"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Click here to create new project</span>
    </v-tooltip>


    <ConfirmDialog
        ref="confirm_dialog"
        title="Delete project?"
        message="Are you sure you want to delete this project?"
        btn_confirm="Delete"
        btn_confirm_clr="error"
        btn_reject="Cancel"
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
import CVSProjectService from '@/services/cvs-project.service';

import ProjectCards from '@/components/projects/ProjectsCards';
import ProjectsList from '@/components/projects/ProjectsList';
import ConfirmDialog from '@/components/utils/ConfirmDialog';
import NewProjectForm from '@/components/projects/NewProjectForm';
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

    project_to_edit: {},
    show_tooltip: false,
  }),

  methods: {
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

    delete_project(project) {
      const id = project.id;
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          CVSProjectService.delete_project(id)
              .catch(error => {
                console.error(error);
              })
              .then(data => {
                if (data === true) {
                  $('.project-with-id-' + id).fadeOut(500);
                }
              });
        }
      });
    },

    update_projects() {
      if (this.$store.state.User.loggedIn) {
        CVSProjectService.get_all_projects()
            .catch(error => {
              console.log(error);
              console.error(error);
            })
            .then(response => {
              if (!!response) {
                const projects = response.chunk;
                if (!!projects) {
                  this.projects = [];
                  for (let i = 0; i < projects.length; i++) {
                    this.projects.push(projects[i]);
                  }
                  this.projects.sort((a, b) => (a.id > b.id) ? 1 : -1); // sorting based on ascending id
                }
              }
            });
      }
    },

  },

  mounted() {
    this.update_projects();
  },

  watch: {
    projects() {
      if (this.projects.length === 0) {
        setTimeout(() => {
          this.show_tooltip = true;
        }, 2000);
      }
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

