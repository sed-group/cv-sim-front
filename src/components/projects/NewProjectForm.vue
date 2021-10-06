<template>
  <div class="new-project-form">
    <v-dialog
        v-model="show_dialog"
        max-width="290"
        persistent
    >
      <v-card>
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
                label="Name"
                v-model="project_name"
                :rules="project_name_rules"
                :counter="255"
                required
            ></v-text-field>
            <v-textarea
                label="Description (optional)"
                v-model="project_description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="emit_close_dialog"
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

export default {
  name: 'NewProjectForm',

  props: ['show_dialog'],

  data: () => ({
    valid: false,
    project_name: '',
    project_description: '',
    project_name_rules: [
      v => !!v || 'A name is required',
      v => v.length <= 255 || 'Too long',
    ],
  }),

  methods: {
    emit_close_dialog() {
      this.$emit('close-dialog');
    },

    submit: async function () {
      if (this.$refs.form.validate()) {
        const project = {
          name: this.project_name,
          description: this.project_description,
        };
        CVSProjectService.create_project(project)
            .catch(error => {
              console.error(error);
            })
            .then(project => {
              this.project_name = '';
              this.project_description = '';
              this.$emit('project-created', project);
              this.emit_close_dialog();
            });
      }
    },
  },

};
</script>


<style scoped>

</style>