<template>
  <div class="edit-project-form">

    <v-dialog
        v-model="show_form"
        max-width="290"
        persistent
    >
      <v-card :loading="loading" :disabled="loading">
        <v-card-title class="text-h5">
          Edit project
        </v-card-title>

        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
          >
            <v-text-field
                label="Project name"
                v-model="project.name"
                :rules="project_name_rules"
                :counter="255"
                required
                clearable
            ></v-text-field>
            <v-textarea
                label="Description (optional)"
                v-model="project.description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
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
            Save
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
  name: 'EditProjectForm',

  props: [
    'show_form',
    'project',
  ],

  data: () => ({
    loading: false,
    valid: false,
    project_name_rules: [
      v => !!v || 'A name is required',
      v => (v && v.length <= 255) || 'Too long',
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
        CVSProjectService.edit_project(this.project)
            .catch(error => {
              console.error(error);
              Notification.emit_standard_error_message();
              this.loading = false;
            })
            .then(project => {
              this.close();
            });
      }
    },
  },


};
</script>


<style scoped>

</style>