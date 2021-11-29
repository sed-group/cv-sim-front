<template>
  <v-card class="overflow-hidden" flat>

    <div style="position: relative">

      <div v-if="!!value_drivers" class="overflow-y-auto px-5 pb-10" style="height: 500px">
        <v-list v-if="value_drivers.length > 0">
          <template v-for="(value_driver, index) in value_drivers">
            <v-menu absolute offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs"
                             v-on="on"
                             :class="'value-driver-' + value_driver.id"
                             :disabled="loading_list_items[index]"
                >
                  <v-list-item-content>
                    <v-card :loading="loading_list_items[index]"
                            loader-height="30"
                            style="background-color: transparent"
                            flat>
                      <v-list-item-title>
                        {{ value_driver.name }}
                      </v-list-item-title>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item key="1" link @click="edit_value_driver(value_driver)">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item key="2" link @click="delete_value_driver(value_driver.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-divider :class="'divider-for-value-driver-' + value_driver.id"></v-divider>
          </template>
        </v-list>
        <div v-else class="mt-5">You have not created any value drivers yet.</div>
      </div>
      <div v-else class="overflow-y-auto px-5 pb-10" style="height: 500px; display: grid; place-items: center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </div>

      <!-- CREATE NEW BUTTON -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              style="position: absolute; bottom: 3em; right: 2em; z-index: 1"
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="show_form = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Create new value driver</span>
      </v-tooltip>

    </div>

    <!-- CREATE / EDIT NEW FORM -->
    <v-dialog
        v-model="show_form"
        max-width="400"
        persistent
    >
      <v-card :loading="loading" :disabled="loading">
        <v-card-title class="text-h5">
          <span v-if="form_type === 'create'">Create new value driver</span>
          <span v-else-if="form_type === 'edit'">Edit value driver</span>
        </v-card-title>

        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit_form"
          >
            <v-text-field
                v-model="form_value_driver_name"
                label="Name"
                :rules="name_rules"
                :counter="255"
                required
                clearable
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="close_form"
          >
            Close
          </v-btn>
          <v-btn
              color="green"
              text
              @click="submit_form"
              :disabled="!valid"
              :loading="loading"
          >
            <span v-if="form_type === 'create'">Create</span>
            <span v-else-if="form_type === 'edit'">Change</span>
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <ConfirmDialog
        ref="confirm_dialog"
        title="Delete value driver?"
        message="Are you sure you want to delete this value driver?"
        btn_confirm="Delete"
        btn_confirm_clr="error"
        btn_reject="Cancel"
    ></ConfirmDialog>

  </v-card>
</template>


<script>
import VCSValueDriversService from '@/services/vcs-value-drivers.service';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';
import ConfirmDialog from '@/components/utils/ConfirmDialog';


export default {
  name: 'VCSValueDrivers',

  components: {
    ConfirmDialog,
    LoadingAnimaiton,
  },

  props: {
    value_drivers: {
      type: Array,
      default: undefined,
    },
  },

  data() {
    return {
      show_form: false,
      name_rules: [
        v => !!v || 'A name is required',
        v => (v && v.length <= 255) || 'Must be less than 255 characters',
      ],
      form_value_driver_name: '',
      valid: false,
      loading: false,
      loading_list_items: [],
      form_type: 'create',
      value_drivers_editing_id: null,
    };
  },

  methods: {
    edit_value_driver(value_driver) {
      this.form_type = 'edit';
      this.value_drivers_editing_id = value_driver.id;
      this.form_value_driver_name = value_driver.name;
      this.show_form = true;
    },

    delete_value_driver(id) {
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          const index = this.value_drivers.findIndex(x => x.id === id);
          this.loading_list_items[index] = true;
          const project_id = this.$route.params.project_id;
          VCSValueDriversService.delete_one(project_id, id)
              .catch(error => {
                this.loading_list_items[index] = false;
                console.error(error);
              })
              .then(response => {
                this.loading_list_items[index] = false;
                if (response === true) {
                  $('.value-driver-' + id).fadeOut(500);
                  $('.divider-for-value-driver-' + id).fadeOut(500);
                }
              });
        }
      });

    },

    close_form() {
      this.clear_form();
      this.show_form = false;
      this.form_type = 'create';
      this.loading = false;
    },

    clear_form() {
      this.form_value_driver_name = '';
      this.$refs.form.resetValidation();
    },

    submit_form() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project_id = this.$route.params.project_id;
        const new_value_driver = {name: this.form_value_driver_name};
        if (this.form_type === 'create') {
          VCSValueDriversService.create_one(project_id, new_value_driver)
              .catch(error => {
                console.error(error);
                this.valid = false;
                this.loading = false;
              })
              .then(value_driver => {
                this.$emit('value-driver-created', value_driver);
                this.close_form();
              });
        } else if (this.form_type === 'edit') {
          new_value_driver.id = this.value_drivers_editing_id;
          VCSValueDriversService.edit_one(project_id, new_value_driver)
              .catch(error => {
                console.error(error);
                this.valid = false;
              })
              .then(value_driver => {
                this.value_drivers_editing_id = null;
                this.$emit('value-driver-edited', value_driver);
                this.close_form();
              });
        }
      }
    },

  },

  watch: {
    value_drivers() {
      if (!!this.value_drivers) {
        this.loading_list_items = new Array(this.value_drivers.length).fill(false);
      }
    },
  },

};
</script>


<style scoped>

</style>

