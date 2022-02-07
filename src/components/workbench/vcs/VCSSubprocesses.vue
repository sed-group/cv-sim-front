<template>
  <v-card class="overflow-hidden" flat>

    <div style="position: relative">

      <div v-if="loading_anim" style="height: 500px; display: grid; place-items: center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </div>
      <div v-else class="overflow-y-auto px-5 pb-10" style="height: 500px">

        <div v-if="no_processes === true" class="mt-5">
          You have not created any subprocesses yet.
        </div>

        <div v-else class="mb-16">
          <v-list v-for="(group, index_outer) in grouped_processes" :disabled="group.disabled === true">
            <v-list-group :value="true" eager class="hej">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="group.parent_process.name"></v-list-item-title>
                </v-list-item-content>
              </template>
              <draggable :list="grouped_processes[index_outer].subprocesses"
                         @change="on_subprocess_reorder"
                         animation="150"
                         ghost-class="draggable-ghost-class"
                         :disabled="group.disabled === true"
              >
                <div v-for="(process, index) in group.subprocesses" :key="process.id">
                  <v-menu absolute offset-y :key="process.id" :disabled="process.loading === true" eager>
                    <template v-slot:activator="{ on, attrs }">
                      <v-hover v-slot="{ hover }">
                        <v-list-item v-bind="attrs" v-on="on"
                                     :class="['subprocess-with-id-' + process.id, (group.disabled === true ? 'greyed-out' : null), 'added-transition']"
                                     :disabled="process.loading === true || group.disabled === true"
                                     :key="index"
                        >
                          <v-list-item-content>
                            <v-card :loading="process.loading === true"
                                    loader-height="30"
                                    style="background-color: transparent"
                                    flat
                            >
                              <v-list-item-title>
                                {{ process.name }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Subprocess of <b>
                                {{ process.parent_process.category }}: {{ process.parent_process.name }}</b>
                              </v-list-item-subtitle>
                            </v-card>
                          </v-list-item-content>
                        </v-list-item>
                      </v-hover>
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
                  <v-divider :class="'divider-for-subprocess-' + process.id"
                             v-if="index !== (group.subprocesses.length - 1)"></v-divider>
                </div>
              </draggable>
            </v-list-group>
          </v-list>
        </div>


      </div>


      <!-- CREATE NEW BUTTON -->
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="show_form = true"
                 style="position: absolute; bottom: 3em; right: 2em; z-index: 1"
                 color="primary"
                 v-bind="attrs"
                 v-on="on"
                 fab>
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
                      :show_subprocesses="false"
                      @close="on_close_process_select"
                      @iso-process-selected="on_iso_process_selected"></VCSProcessSelect>


    <ConfirmDialog
        ref="confirm_dialog"
        title="Delete subprocess?"
        :message="'Are you sure you want to delete \'' + process_to_delete + '\'?'"
        :width="500"
        btn_confirm="Delete"
        btn_confirm_clr="error"
        btn_reject="Cancel"
    ></ConfirmDialog>

  </v-card>
</template>


<script>
import draggable from 'vuedraggable';
import Vue from 'vue';

import VCSProcessSelect from '@/components/workbench/vcs/VCSProcessSelect';
import VCSSubprocessesService from '@/services/vcs-subprocess.service';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';
import ConfirmDialog from '@/components/utils/ConfirmDialog';

import ISOProcesses from '@/models/ISOProcesses';
import Notification from '@/models/utils/Notification';

export default {
  name: 'VCSSubprocesses',

  props: {
    subprocesses: {},
    loading_anim: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    ConfirmDialog,
    LoadingAnimaiton,
    VCSProcessSelect,
    draggable,
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
      process_to_delete: '',

      // Process select
      show_process_select: false,
      iso_processes: ISOProcesses,
      no_processes: false,

      grouped_processes: [],
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
      const process = this.subprocesses.find(item => item.id === id);
      this.process_to_delete = process.parent_process.name + ': ' + process.name;
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          process.loading = true;
          const project_id = this.$route.params.project_id;
          VCSSubprocessesService.delete_one(project_id, id)
              .catch(error => {
                process.loading = false;
                console.error(error);
              })
              .then(response => {
                process.loading = false;
                if (response === true) {
                  const timer = 500; // [ms]
                  $('.subprocess-with-id-' + id).fadeOut(timer);
                  $('.divider-for-subprocess-' + id).fadeOut(timer);
                  setTimeout(() => {
                    this.$emit('subprocess-deleted', id);
                  }, timer);
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
        const new_subprocess = {
          name: this.form_subprocess_name,
          parent_process_id: this.form_parent_process.id,
        };

        if (this.form_type === 'create') {
          const group = this.grouped_processes.find(item => item.parent_process.id === this.form_parent_process.id);
          const max_index = !!group ? Math.max.apply(Math, group.subprocesses.map(item => item.order_index)) : 0;
          new_subprocess.order_index = max_index + 1;
          VCSSubprocessesService.create_one(this.project.id, new_subprocess)
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
          VCSSubprocessesService.edit_one(this.project.id, new_subprocess)
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

    on_iso_process_selected(id) {
      const selected_process = this.iso_processes.find(obj => obj.id === id);
      if (!!selected_process) {
        this.form_parent_process = selected_process;
      }
    },

    group_subprocesses() {
      this.grouped_processes = [];
      if (!!this.subprocesses) {
        const unique_parent_process_ids = [...new Set(this.subprocesses.map(item => item.parent_process.id))];
        unique_parent_process_ids.sort((a, b) => a - b);
        this.grouped_processes = unique_parent_process_ids.map(id => {
          const parent_process = this.iso_processes.find(item => item.id === id);
          const subprocesses = this.subprocesses.filter(item => item.parent_process.id === id);
          subprocesses.sort((a, b) => (a.order_index > b.order_index) ? 1 : -1);
          return {parent_process, subprocesses};
        });
      }
      this.no_processes = this.grouped_processes.length === 0;
    },

    on_subprocess_reorder(event) {
      const parent_process_id = event.moved.element.parent_process.id;
      const group = this.grouped_processes.find(item => item.parent_process.id === parent_process_id);
      Vue.set(group, 'disabled', true);

      const subprocess_ids = [], order_indices = [];
      for (let i = 0; i < group.subprocesses.length; i++) {
        subprocess_ids.push(group.subprocesses[i].id);
        order_indices.push(i + 1);
      }

      VCSSubprocessesService.update_indices(this.project.id, subprocess_ids, order_indices)
          .catch(error => {
            console.error(error);
            Vue.set(group, 'disabled', false);
          })
          .then(response => {
            if (response === true) {
              Vue.set(group, 'disabled', false);
            } else {
              Notification.emit_standard_error_message();
            }
          });
    },

  },

  watch: {
    subprocesses() {
      this.group_subprocesses();
      this.group_subprocesses();
    },
  },

  computed: {
    project() {
      return this.$store.state.Project.active_project;
    },
  },

};

</script>


<style scoped>

.added-transition {
  transition: opacity 200ms ease;
}

.greyed-out {
  opacity: 30%;
  transition-duration: 0ms; /* no fade in, just fade out */
}

.draggable-ghost-class {
  visibility: hidden;
}


</style>

