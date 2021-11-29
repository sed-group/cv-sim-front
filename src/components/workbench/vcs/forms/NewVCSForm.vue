<template>
  <div class="new-vcs-form">

    <v-dialog
        v-model="show"
        max-width="400"
        @click:outside="emit_close"
    >
      <v-card :loading="loading" :disabled="loading">
        <v-card-title class="text-h5">
          Create new VCS
        </v-card-title>

        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
          >
            <v-text-field
                v-model="vcs_name"
                label="Name"
                :rules="rules.vcs_name"
                :counter="255"
                required
                clearable
            ></v-text-field>

            <v-textarea
                v-model="vcs_description"
                label="Description (optional)"
                :rows="description_rows"
                @focus="description_rows = 4"
                clearable
            ></v-textarea>

            <div style="display:flex; justify-content: space-between">
              <v-text-field
                  v-model="year_from"
                  label="From year"
                  type="number"
                  :rules="rules.year"
                  style="max-width: 150px"
              ></v-text-field>
              <v-text-field
                  v-model="year_to"
                  label="To year"
                  type="number"
                  :rules="rules.year"
                  style="max-width: 150px"
              ></v-text-field>
            </div>
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
              @click="emit_close"
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
import CVSVCSService from '@/services/cvs-vcs.service';
import Notification from '@/models/utils/Notification';

export default {
  name: 'NewVCSForm',

  props: {
    show: Boolean,
  },

  data: () => ({
    loading: false,
    valid: true,
    vcs_name: '',
    vcs_description: '',
    description_rows: 1,
    year_from: new Date().getFullYear().toString(),
    year_to: (new Date().getFullYear() + 6).toString(),

    rules: {
      year: [
        v => v.length > 0 || 'Please provide a year',
        v => Number.isInteger(Number(v)) || 'Must be an integer number',
        v => v > 0 || 'Must be greater than zero',
      ],
      vcs_name: [
        v => !!v || 'A name is required',
        v => v.length <= 255 || 'Must be less than 255 characters',
      ],
    },

  }),

  methods: {
    emit_close() {
      this.$emit('close');
      this.loading = false;
    },

    submit: async function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const vcs = {
          name: this.vcs_name,
          description: this.vcs_description,
          year_from: this.year_from,
          year_to: this.year_to,
        };
        const project_id = this.$route.params.project_id;
        CVSVCSService.create_vcs(project_id, vcs)
            .catch(error => {
              console.error(error);
              Notification.emit_standard_error_message();
              this.loading = false;
            })
            .then(vcs => {
              this.reset_form();
              this.$emit('vcs-created', vcs);
              this.emit_close();
            });
      }
    },

    reset_form() {
      this.vcs_name = '';
      this.vcs_description = '';
      this.description_rows = 1;
      this.year_from = new Date().getFullYear().toString();
      this.year_to = (new Date().getFullYear() + 6).toString();

      this.$refs.form.resetValidation();
    },

  },
};
</script>


<style scoped>

</style>