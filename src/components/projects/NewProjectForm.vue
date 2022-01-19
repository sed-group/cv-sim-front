<template>
  <div class="new-project-form">

    <v-dialog
        v-model="show_form"
        max-width="400"
        persistent
    >
      <v-card :loading="loading" :disabled="loading">
        <v-card-title class="text-h5">
          Create new project
        </v-card-title>

        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
          >
            <v-text-field
                v-model="project_name"
                label="Project name"
                :rules="project_name_rules"
                :counter="255"
                required
            ></v-text-field>
            <v-textarea
                v-model="project_description"
                label="Description (optional)"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
              text
              @click="reset_form"
          >
            Reset
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="close"
          >
            Close
          </v-btn>
          <v-btn
              color="green"
              text
              @click="submit"
              :disabled="!valid"
          >
            Create
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import CVSProjectService from '@/services/cvs-project.service';
import Notification from '@/models/utils/Notification';

export default {
  name: 'NewProjectForm',

  props: ['show_form'],

  data: () => ({
    loading: false,
    valid: true,
    project_name: '',
    project_description: '',

    project_name_rules: [
      v => !!v || 'A project name is required',
      v => v.length <= 255 || 'Must be less than 255 characters',
    ],
  }),

  methods: {
    close() {
      this.$emit('close-dialog');
      this.loading = false;
    },

    submit: async function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          name: this.project_name,
          description: this.project_description,
        };
        CVSProjectService.create_project(project)
            .catch(error => {
              console.error(error);
              Notification.emit_standard_error_message();
              this.loading = false;
            })
            .then(project => {
              this.reset_form();
              this.$emit('project-created', project);
              this.close();
            });
      }
    },

    reset_form() {
      this.project_name = '';
      this.project_description = '';

      this.$refs.form.resetValidation();
    },

  },
};
</script>


<style scoped>

</style>