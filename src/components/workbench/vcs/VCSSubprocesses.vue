<template>
  <v-card class="overflow-hidden" flat>

    <div style="position: relative">

      <div v-if="!!subprocesses" class="overflow-y-auto px-5 pb-10" style="height: 500px">
        <v-list v-if="subprocesses.length > 0">
          <template v-for="(process, index) in subprocesses">
            <v-menu absolute offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs"
                             v-on="on"
                             :class="'subprocess-with-id-' + process.id"
                             :disabled="loading_list_items[index]"
                >
                  <v-list-item-content>
                    <v-card :loading="loading_list_items[index]"
                            loader-height="30"
                            style="background-color: transparent"
                            flat>
                      <v-list-item-title>
                        {{ process.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Subprocess of <b>{{ process.parent_process.category }}: {{ process.parent_process.name }}</b>
                      </v-list-item-subtitle>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item key="1" link @click="edit_process(process)">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item key="2" link @click="delete_process(process.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-divider :class="'divider-for-subprocess-' + process.id"></v-divider>
          </template>
        </v-list>
        <div v-else class="mt-5">You have not created any subprocesses yet.</div>
      </div>
      <div v-else style="height: 500px; display: grid; place-items: center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </div>

      <!-- CREATE NEW BUTTON -->
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab
                 style="position: absolute; bottom: 3em; right: 2em; z-index: 1"
                 color="primary"
                 v-bind="attrs"
                 v-on="on"
                 @click="show_form = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Create new subprocess</span>
      </v-tooltip>

    </div>

    <!-- CREATE / EDIT NEW FORM -->
    <v-dialog
        v-model="show_form"
        max-width="400"
        persistent
    >
      <v-card :loading="loading">
        <v-card-title class="text-h5">
          <span v-if="form_type === 'create'">Create new subprocess</span>
          <span v-else-if="form_type === 'edit'">Edit subprocess</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submit_form"
          >
            <v-text-field
                label="Name"
                v-model="form_subprocess_name"
                :rules="rules.name"
                :counter="255"
                required
                clearable
            ></v-text-field>
            <div @click="show_process_select = true">
              <v-select
                  label="Select parent process"
                  v-model="form_parent_process"
                  :items="iso_processes"
                  item-text="name"
                  :rules="rules.select"
                  return-object
                  clearable
                  readonly
              ></v-select>
            </div>
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

    <VCSProcessSelect :show="show_process_select"
                      @close="on_close_process_select"
                      :custom_processes="custom_processes"
                      :show_custom_processes="false"
                      @selected-process="on_process_selected"></VCSProcessSelect>

    <ConfirmDialog
        ref="confirm_dialog"
        title="Delete subprocess?"
        message="Are you sure you want to delete this subprocess?"
        btn_confirm="Delete"
        btn_confirm_clr="error"
        btn_reject="Cancel"
        :persistent="true"
    ></ConfirmDialog>

  </v-card>
</template>


<script>
import VCSProcessSelect from '@/components/workbench/vcs/iso_processes/VCSProcessSelect';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';
import ConfirmDialog from '@/components/utils/ConfirmDialog';

export default {
  name: 'VCSSubprocesses',

  props: {
    subprocesses: {
      type: Array,
      default: undefined,
    },
  },

  components: {
    ConfirmDialog,
    LoadingAnimaiton,
    VCSProcessSelect,
  },

  data() {
    return {
      // Form stuff
      show_form: false,
      rules: {
        name: [
          v => !!v || 'A name is required',
          v => (v && v.length <= 255) || 'Must be less than 255 characters',
        ],
        select: [
          v => !!v || 'A parent process is required',
        ],
      },
      form_subprocess_name: '',
      form_parent_process: undefined,
      valid: false,
      loading: false,
      form_type: 'create',
      subprocess_editing_id: null,

      // Process select
      show_process_select: false,
      custom_processes: [],
      iso_processes: [
        // AGREEMENT PROCESSES
        {id: 1, name: 'Acquisition', group: 'Agreement Processes'},
        {id: 2, name: 'Supply', group: 'Agreement Processes'},

        // ORGANIZATIONAL PROJECT-ENABLING PROCESSES
        {id: 3, name: 'Life-cycle model management', group: 'Organizational project-enabling processes'},
        {id: 4, name: 'Infrastructure management', group: 'Organizational project-enabling processes'},
        {id: 5, name: 'Project portfolio management', group: 'Organizational project-enabling processes'},
        {id: 6, name: 'Human resource management', group: 'Organizational project-enabling processes'},
        {id: 7, name: 'Quality management', group: 'Organizational project-enabling processes'},

        // PROJECT PROCESSES
        {id: 8, name: 'Project planning', group: 'Project processes'},
        {id: 9, name: 'Project assessment and control', group: 'Project processes'},
        {id: 10, name: 'Decision management', group: 'Project processes'},
        {id: 11, name: 'Risk management', group: 'Project processes'},
        {id: 12, name: 'Configuration management', group: 'Project processes'},
        {id: 13, name: 'Information management', group: 'Project processes'},
        {id: 14, name: 'Measurement', group: 'Project processes'},

        // TECHNICAL PROCESSES
        {id: 15, name: 'Stakeholder requirements definition', group: 'Technical processes'},
        {id: 16, name: 'Requirements analysis', group: 'Technical processes'},
        {id: 17, name: 'Architectual design', group: 'Technical processes'},
        {id: 18, name: 'Implementation', group: 'Technical processes'},
        {id: 19, name: 'Integration', group: 'Technical processes'},
        {id: 20, name: 'Verification', group: 'Technical processes'},
        {id: 21, name: 'Transition', group: 'Technical processes'},
        {id: 22, name: 'Validation', group: 'Technical processes'},
        {id: 23, name: 'Operation', group: 'Technical processes'},
        {id: 24, name: 'Maintenance', group: 'Technical processes'},
        {id: 25, name: 'Disposal', group: 'Technical processes'},
      ],

      loading_list_items: [],

    };
  },

  methods: {
    edit_process(subprocess) {
      this.form_type = 'edit';
      this.subprocess_editing_id = subprocess.id;
      this.form_subprocess_name = subprocess.name;
      this.form_parent_process = subprocess.parent_process;
      this.show_form = true;
    },

    delete_process(id) {
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          const project_id = this.$route.params.project_id;
          const index = this.subprocesses.findIndex(x => x.id === id);
          this.loading_list_items[index] = true;
          VCSSubprocessesService.delete_one(project_id, id)
              .catch(error => {
                this.loading_list_items[index] = false;
                console.error(error);
              })
              .then(response => {
                this.loading_list_items[index] = false;
                if (response === true) {
                  $('.subprocess-with-id-' + id).fadeOut(500);
                  $('.divider-for-subprocess-' + id).fadeOut(500);
                }
              });
        }
      });
    },

    close_form() {
      this.clear_form();
      this.show_form = false;
      this.form_type = 'create';
    },

    clear_form() {
      this.form_subprocess_name = '';
      this.form_parent_process = '';
      this.$refs.form.resetValidation();
      this.loading = false;
    },

    submit_form() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project_id = this.$route.params.project_id;
        const new_subprocess = {
          name: this.form_subprocess_name,
          parent_process_id: this.form_parent_process.id,
        };

        if (this.form_type === 'create') {
          VCSSubprocessesService.create_one(project_id, new_subprocess)
              .catch(error => {
                console.error(error);
                this.valid = false;
              })
              .then(subprocess => {
                this.$emit('subprocess-created', subprocess);
                this.close_form();
              });
        } else if (this.form_type === 'edit') {
          new_subprocess.id = this.subprocess_editing_id;
          VCSSubprocessesService.edit_one(project_id, new_subprocess)
              .catch(error => {
                console.error(error);
                this.valid = false;
              })
              .then(subprocess => {
                this.subprocess_editing_id = null;
                this.$emit('subprocess-edited', subprocess);
                this.close_form();
              });
        }
      }
    },

    on_close_process_select() {
      this.show_process_select = false;
    },

    on_process_selected(id) {
      const selected_process = this.iso_processes.find(obj => {
        return obj.id === id;
      });
      if (!!selected_process) {
        this.form_parent_process = selected_process;
      }
    },

  },

  watch: {
    subprocesses() {
      if (!!this.subprocesses) {
        this.loading_list_items = new Array(this.subprocesses.length).fill(false);
      }
    },
  },

};

</script>


<style scoped>

</style>

