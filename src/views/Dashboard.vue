<template>
  <div class="dashboard">

    <v-navigation-drawer
        app
        permanent
        class="align-center pt-5"
    >
      <v-btn @click.stop="show_project_form = true">
        + Project
      </v-btn>
    </v-navigation-drawer>

    <ProjectsView :projects="projects"></ProjectsView>

    <NewProjectForm
        :show_dialog="show_project_form"
        @close-dialog="on_close_project_form"
        @project-created="on_project_created($event)"
    ></NewProjectForm>

  </div>
</template>


<script>
import ProjectsView from '@/components/projects/ProjectsView';
import NewProjectForm from '@/components/projects/NewProjectForm';
import InfoSnackbar from '@/components/InfoSnackbar';

import CVSProjectService from '@/services/cvs-project.service';

export default {
  name: 'Dashboard',

  components: {
    InfoSnackbar,
    NewProjectForm,
    ProjectsView,
  },

  data: () => ({
    user: {
      username: 'admin',
    },
    projects: [],
    show_project_form: false,
    snackbar: false,
    snackbar_msg: 'This is some nice information.',
  }),

  methods: {
    on_close_project_form() {
      this.show_project_form = false;
    },

    on_project_created(project) {
      this.projects.push(project);
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

</style>

