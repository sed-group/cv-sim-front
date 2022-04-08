<template>

  <v-container v-if="table_loading === true" fill-height fluid style="min-height: 500px">
    <v-row justify="center">
      <v-col align="center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </v-col>
    </v-row>
  </v-container>


  <div v-else-if="no_table === true" class="no-table-container">
    <v-btn @click="create_empty_table" color="success">
      <v-icon left>mdi-plus</v-icon>
      Create table
    </v-btn>
  </div>


  <div v-else class="vcs-table pt-5 pb-16" style="overflow: scroll">

    <div class="progress-circle" style="display: none">
      <v-tooltip left max-width="300">
        <template v-slot:activator="{ on, attrs }">
          <v-progress-circular
              rotate="-90"
              size="100"
              width="15"
              :value="progress"
              :color="(progress === 100) ? 'green' : ((progress === 0) ? 'grey' : ((progress < 100) ? 'orange' : 'red'))"
              v-bind="attrs"
              v-on="on"
          >
            {{ progress }}
          </v-progress-circular>
        </template>
        <span>This is the sum of the rank weight percentages and needs to equal 100.</span>
      </v-tooltip>
    </div>

    <div class="button-container">

      <v-fade-transition leave-absolute>
        <v-card v-show="!edit">
          <v-btn @click="edit_clicked">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </v-card>
      </v-fade-transition>

      <v-fade-transition leave-absolute>
        <v-card v-show="edit">
          <v-btn :loading="save_loading" @click="save_clicked" :disabled="!edit && !save_loading" color="success">
            <v-icon left>mdi-content-save</v-icon>
            Save
            <template v-slot:loader>
              <span>Saving...</span>
            </template>
          </v-btn>
        </v-card>
      </v-fade-transition>

      <v-fade-transition leave-absolute>
        <v-card v-show="edit">
          <v-btn @click="cancel_clicked" :disabled="!edit" color="error">
            <v-icon left>mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-card>
      </v-fade-transition>

    </div>


    <table class="my-table" :width="edit ? 986 : 950">
      <tr>
        <th v-if="edit === true" style="width: 36px"></th>

        <th style="width: 200px">Process</th>
        <th style="width: 80px">Stakeholder</th>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on" style="width: 300px; cursor: help">Stakeholder expectaions</th>
          </template>
          <span>
            Stakeholder expressed expectations are expectations that have been stated by stakeholders. In contrast,
            stakeholder validated expectations are what we understand to be the expectations of stakeholders based on
            their statements made. These may be reformulated and contain additional information, and have to be
            validated by the stakeholders. This validation means that the stakeholders agree that we have properly
            understood their expectations. Stakeholder expectations can be of any format, granularity or detail.
          </span>
        </v-tooltip>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on" style="width: 170px; cursor: help">Stakeholder needs</th>
          </template>
          <span>
            Stakeholder Needs are high-level statements of problems that need to be solved by a new or re-used system
            solution. In a given context these needs will be based on captured and validated expectations of external
            stakeholders, as well as additional context knowledge from external and internal stakeholders. Needs are the
            source for the development of Requirements, through the Objective definition activity (to make them
            measurable); and are satisfied by improvements along one or several value dimensions.
          </span>
        </v-tooltip>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on" style="width: 40px; cursor: help">Rank weight</th>
          </template>
          <span>
            The relative importance of the Stakeholder Needs, used to create a profile of interest for a study (Value
            Creation Strategy).
          </span>
        </v-tooltip>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on" style="width: 150px; cursor: help">Value Drivers</th>
          </template>
          <span>
            Value drivers indicate Key Engineering Characteristics given a specific Value Creation Strategy (i.e. for a
            specific stakeholder profile and context). They represent proposed directions of investigation since they
            seem to have a significant influence on the perceived value in a given context. Value Drivers themselves are
            not attached to a target value or function, but they tend to result in measurable objectives and later,
            based on these, requirements. Examples of Value Drivers are “Minimum expected life” that impact performance
            in service, “mass” that impact “take-off weight” or “number of interfaces” that impact how easy a
            technology/component is to integrated into a system.
          </span>
        </v-tooltip>

      </tr>

      <tbody v-for="row in displayed_table" :id="'vcs_table_row_id-' + row.id">
        <tr>
          <!-- ROW ORDERING -->
          <td :rowspan="row.stakeholder_needs.length + 1" v-if="edit" class="pa-0 ma-0">

            <table>
              <tr>
                <td class="pa-0">
                  <v-tooltip right open-delay="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="move_row_up(row.id)">
                        <v-icon>mdi-arrow-up-thick</v-icon>
                      </v-btn>
                    </template>
                    <span>Move row up</span>
                  </v-tooltip>
                </td>
                <td rowspan="2" class="pa-0">
                  <v-btn icon color="error" @click="delete_row(row.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td class="pa-0">
                  <v-tooltip right open-delay="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="move_row_down(row.id)">
                        <v-icon>mdi-arrow-down-thick</v-icon>
                      </v-btn>
                    </template>
                    <span>Move row down</span>
                  </v-tooltip>
                </td>
              </tr>
            </table>

          </td>

          <!-- PROCESS -->
          <td v-if="edit" :rowspan="row.stakeholder_needs.length + 1">

            <v-tooltip v-if="!!row.iso_process" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-list class="transparent my-list-container" width="200">
                  <v-list-item @click="select_process(row.id)" v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.iso_process.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ row.iso_process.category }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>ISO process</span>
            </v-tooltip>

            <v-tooltip v-else-if="!!row.subprocess" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-list class="transparent my-list-container" width="200">
                  <v-list-item @click="select_process(row.id)" v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.subprocess.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        ISO: {{ row.subprocess.parent_process.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>
                Subprocess of {{ row.subprocess.parent_process.name }} ({{ row.subprocess.parent_process.category }})
              </span>
            </v-tooltip>

            <div v-else @click="select_process(row.id)" class="empty-process-select"
                 style="width: 100%; text-align: center; cursor: pointer">
              <v-icon>mdi-select</v-icon>
            </div>

          </td>
          <td v-else :rowspan="row.stakeholder_needs.length">

            <v-tooltip v-if="!!row.iso_process" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-list class="transparent my-list-container" width="200">
                  <v-list-item v-bind="attrs" v-on="on" link class="my-list">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.iso_process.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ row.iso_process.category }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>ISO process</span>
            </v-tooltip>

            <v-tooltip v-else-if="!!row.subprocess" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-list class="transparent" width="200">
                  <v-list-item v-bind="attrs" v-on="on" link>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.subprocess.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        ISO: {{ row.subprocess.parent_process.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>
                Subprocess of {{ row.subprocess.parent_process.name }} ({{ row.subprocess.parent_process.category }})
              </span>
            </v-tooltip>

            <span v-else></span>
          </td>


          <!-- STAKEHOLDER -->
          <td v-if="edit" :rowspan="row.stakeholder_needs.length + 1">
            <v-text-field v-model="row.stakeholder"
                          placeholder="Stakeholder"
            ></v-text-field>
          </td>
          <td v-else-if="!!row.stakeholder" :rowspan="row.stakeholder_needs.length">
            {{ row.stakeholder.toUpperCase() }}
          </td>
          <td v-else :rowspan="row.stakeholder_needs.length"></td>

          <!-- STAKEHOLDER EXPECTATIONS -->
          <td v-if="edit" :rowspan="row.stakeholder_needs.length + 1">
            <v-textarea v-model="row.stakeholder_expectations"
                        placeholder="Stakeholder expectations"
                        auto-grow
                        no-resize
            ></v-textarea>
          </td>
          <td :rowspan="row.stakeholder_needs.length" v-else>{{ row.stakeholder_expectations }}</td>

          <!-- STAKEHOLDER NEEDS -->
          <td>
            <v-text-field v-if="edit"
                          v-model="row.stakeholder_needs[0].need"
                          placeholder="Stakeholder need"
            ></v-text-field>
            <span v-else>{{ row.stakeholder_needs[0].need }}</span>
          </td>

          <!-- RANK WEIGHTS -->
          <td>
            <v-text-field v-if="edit"
                          v-model="row.stakeholder_needs[0].rank_weight"
                          type="number"
                          :rules="rules.rank_weight"
                          dense
            ></v-text-field>
            <span v-else>{{ row.stakeholder_needs[0].rank_weight }}</span>
          </td>

          <!-- VALUE DRIVERS -->
          <td>
            <v-combobox
                v-if="edit"
                v-model="row.stakeholder_needs[0].value_drivers"
                :items="value_drivers"
                item-text="name"
                item-value="id"
                return-object
                chips
                placeholder="Value drivers"
                multiple
                dense
                deletable-chips
                @input="value_driver_combobox(row.stakeholder_needs[0])"
                :loading="row.stakeholder_needs[0].loading"
                :disabled="row.stakeholder_needs[0].loading"
            ></v-combobox>
            <div v-else
                 v-for="value_driver in row.stakeholder_needs[0].value_drivers"
                 class="value-drivers"
            >
              {{ value_driver.name }}
            </div>
          </td>

        </tr>

        <tr v-for="stakeholder_need in row.stakeholder_needs.slice(1)">

          <!-- STAKEHOLDER NEEDS -->
          <td>
            <v-text-field v-if="edit"
                          v-model="stakeholder_need.need"
                          placeholder="Stakeholder need"
            ></v-text-field>
            <span v-else>{{ stakeholder_need.need }}</span>
          </td>

          <!-- RANK WEIGHTS -->
          <td>
            <v-text-field v-if="edit"
                          v-model="stakeholder_need.rank_weight"
                          type="number"
                          dense
                          :rules="rules.rank_weight"
                          :value="stakeholder_need.rank_weight"
            ></v-text-field>
            <span v-else>{{ stakeholder_need.rank_weight }}</span>
          </td>

          <!-- VALUE DRIVERS -->
          <td>
            <v-combobox
                v-if="edit"
                v-model="stakeholder_need.value_drivers"
                :items="value_drivers"
                item-text="name"
                item-value="id"
                return-object
                chips
                placeholder="Value drivers"
                multiple
                dense
                deletable-chips
                @input="value_driver_combobox(stakeholder_need)"
                :loading="stakeholder_need.loading"
                :disabled="stakeholder_need.loading"
            ></v-combobox>
            <div v-else
                 v-for="value_driver in stakeholder_need.value_drivers"
                 class="value-drivers"
            >
              {{ value_driver.name }}
            </div>
          </td>

        </tr>

        <tr v-if="edit">
          <td colspan="3" style="text-align: center">
            <v-btn small color="success" class="my-1" @click="add_stakeholder_need(row.id)">
              <v-icon left>mdi-plus</v-icon>
              Add stakeholder need
            </v-btn>
          </td>
        </tr>

      </tbody>

      <!-- NEW ROW INTERFACE -->
      <tfoot v-if="edit">
        <tr>
          <td :colspan="edit ? 7 : 6">
            <v-btn small color="success" class="my-2 mx-auto" @click="add_row">
              <v-icon left>mdi-table-row-plus-after</v-icon>
              Add new row
            </v-btn>
          </td>
        </tr>
      </tfoot>

    </table>


    <VCSProcessSelect
        :show="show_process_select"
        @close="on_close_process_select"
        :show_custom_processes="true"
        @iso-process-selected="on_iso_process_selected"
        @subprocess-selected="on_subprocess_selected"
    ></VCSProcessSelect>


    <v-dialog v-model="open_dialog" width="500">
      <v-card class="pa-5">
        <v-tabs>
          <v-tab key="1">Slider</v-tab>
          <v-tab key="2">Number</v-tab>
          <v-tab key="3">Pairwise</v-tab>
        </v-tabs>

        <v-tabs-items>
          <v-tab-item key="1">
            <v-slider></v-slider>
          </v-tab-item>

          <v-tab-item key="2">
            <v-text-field label="Enter text"></v-text-field>
          </v-tab-item>

          <v-tab-item key="3">
            <h3>Pairwise</h3>
          </v-tab-item>

        </v-tabs-items>
      </v-card>
    </v-dialog>


    <!-- SNACKBAR -->
    <v-snackbar
        v-model="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }" v-if="snackbar.closeable === true">
        <v-btn
            v-bind="attrs"
            @click="snackbar.show = false"
            icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

  </div>


</template>


<script>
import VCSProcessSelect from '@/components/workbench/vcs/VCSProcessSelect';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

import Notification from '@/models/utils/Notification';
import ISOProcesses from '@/models/ISOProcesses';
import ValueDrivers from '@/models/ValueDrivers';

import CVSVCSService from '@/services/cvs-vcs.service';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';


export default {
  name: 'VCSTable',

  props: {},

  components: {
    LoadingAnimaiton,
    VCSProcessSelect,
  },

  data() {
    return {
      show_process_select: false,
      no_table: false,

      progress: 0,
      open_dialog: false,

      table_loading: true,

      save_loading: false,
      edit: false,
      editing_row_id: null,

      vcs_table: null,
      displayed_table: null,

      rules: {
        rank_weight: [
          v => v >= 0 || 'Should be positive',
        ],
      },

      snackbar: {
        show: false,
        timout: -1,
        text: null,
        closeable: true,
        color: null,
      },
    };
  },

  methods: {
    select_process(row_id) {
      this.editing_row_id = row_id;
      this.show_process_select = true;
    },
    on_close_process_select() {
      this.show_process_select = false;
    },
    on_iso_process_selected(iso_process_id) {
      const iso_process = ISOProcesses.find(obj => obj.id === iso_process_id);
      if (!!this.editing_row_id) {
        const index = this.displayed_table.findIndex(obj => obj.id === this.editing_row_id);
        this.displayed_table[index].iso_process = iso_process;
        this.displayed_table[index].subprocess = undefined;
      }
      this.editing_row_id = null;
    },
    on_subprocess_selected(subprocess) {
      if (!!this.editing_row_id) {
        const index = this.displayed_table.findIndex(obj => obj.id === this.editing_row_id);
        this.displayed_table[index].subprocess = subprocess;
        this.displayed_table[index].iso_process = undefined;
      }
      this.editing_row_id = null;
    },

    edit_clicked() {
      this.edit = true;
    },
    cancel_clicked() {
      this.edit = false;
      this.displayed_table = this.vcs_table.slice();
      this.displayed_table.sort((a, b) => (a.row_index > b.row_index) ? 1 : -1);
    },
    save_clicked() {
      this.save_loading = true;

      // Creating request model
      const table_rows = [];
      for (const row of this.displayed_table) {
        const new_row = {};

        // Row index
        new_row.row_index = row.row_index;

        // Process
        new_row.iso_process_id = undefined;
        new_row.subprocess_id = undefined;
        if (row.iso_process) {
          new_row.iso_process_id = row.iso_process.id;
        } else if (row.subprocess) {
          new_row.subprocess_id = row.subprocess.id;
        }

        // Stakeholder
        new_row.stakeholder = (!!row.stakeholder) ? row.stakeholder.toUpperCase() : row.stakeholder;

        // Stakeholder expectations
        new_row.stakeholder_expectations = row.stakeholder_expectations;

        // Stakeholder needs
        new_row.stakeholder_needs = row.stakeholder_needs.map(stakeholder_need => {
          return {
            need: stakeholder_need.need,
            rank_weight: (!!stakeholder_need.rank_weight) ? stakeholder_need.rank_weight : 0,
            value_driver_ids: stakeholder_need.value_drivers.map(x => x.id),
          };
        });

        table_rows.push(new_row);
      }

      CVSVCSService.create_vcs_table(this.$route.params.project_id, this.vcs.id, table_rows)
          .catch(error => {
            console.error('error:');
            console.error(error);
            new Notification('error', error).push();
          })
          .then(response => {
            if (response === true) {
              this.snackbar = {
                text: 'Table saved successfully.',
                timeout: 3000,
                color: 'success',
                clearable: false,
                show: true,
              };
            } else {
              this.displayed_table = this.vcs_table.slice();
              this.snackbar.text = 'Table creation failed for some reason. Please try again.';
              this.snackbar.timeout = -1;
              this.snackbar.color = 'error';
              this.snackbar.closeable = true;
              this.snackbar.show = true;
            }
            this.edit = false;
            this.save_loading = false;
          });
    },


    add_row() {
      const empty_stakeholder_needs = [{
        need: '',
        rank_weight: 0,
        value_drivers: new Array(0),
      }];
      const empty_row = {
        id: this.get_unique_id(),
        iso_process: null,
        subprocess: null,
        stakeholder: null,
        stakeholder_expectations: null,
        stakeholder_needs: empty_stakeholder_needs,
      };
      this.displayed_table.push(empty_row);
      this.update_row_indices();
    },
    delete_row(row_id) {
      const index = this.displayed_table.findIndex(obj => obj.id === row_id);
      this.displayed_table.splice(index, 1);
      this.update_row_indices();
    },

    move_row_up(row_id) {
      const above_row_index = this.displayed_table.findIndex(obj => obj.id === row_id);
      const above_row = this.displayed_table[above_row_index];
      const min_row_index = Math.min.apply(Math, this.displayed_table.map(obj => obj.row_index));
      if (above_row.row_index > min_row_index) {
        const below_row = this.displayed_table.find(obj => obj.row_index === above_row.row_index - 1);
        this.swap_row_places(above_row, below_row);
      }
    },
    move_row_down(row_id) {
      const below_row = this.displayed_table.find(obj => obj.id === row_id);
      const max_row_index = Math.max.apply(Math, this.displayed_table.map(obj => obj.row_index));
      if (below_row.row_index < max_row_index) {
        const above_row = this.displayed_table.find(obj => obj.row_index === below_row.row_index + 1);
        this.swap_row_places(above_row, below_row);
      }
    },
    swap_row_places(row1, row2) {
      const mem = row1.row_index;
      row1.row_index = row2.row_index;
      row2.row_index = mem;
      this.displayed_table.sort((a, b) => (a.row_index > b.row_index) ? 1 : -1);
    },

    add_stakeholder_need(row_id) {
      const index = this.displayed_table.findIndex(obj => obj.id === row_id);
      const empty_stakeholder_needs = {
        need: '',
        rank_weight: 0,
        value_drivers: new Array(0),
      };
      this.displayed_table[index].stakeholder_needs.push(empty_stakeholder_needs);
    },
    get_unique_id() {
      return Math.floor(Math.random() * Math.floor(Math.random() * (new Date().getTime())));
    },
    update_row_indices() {
      for (let i = 0; i < this.displayed_table.length; i++) {
        this.displayed_table[i].row_index = i;
      }
    },

    create_empty_table() {
      this.displayed_table = [];
      const empty_stakeholder_needs = [{
        need: '',
        rank_weight: 0,
        value_drivers: [],
      }];
      const new_empty_row = {
        id: this.get_unique_id(),
        row_index: 0,
        iso_process: null,
        subprocess: null,
        stakeholder: null,
        stakeholder_expectations: null,
        stakeholder_needs: empty_stakeholder_needs,
      };
      this.displayed_table.push(new_empty_row);
      this.no_table = false;
      this.edit = true;
    },

    get_vcs_table(vcs_id) {
      this.edit = false;
      this.table_loading = true;
      CVSVCSService.get_vcs_table(this.project.id, vcs_id)
          .catch(error => {
            console.log(error);
            Notification.emit_standard_error_message();
            this.table_loading = false;
          })
          .then(data => {
            if (!!data) {
              this.vcs_table = data.table_rows;
              if (this.vcs_table.length === 0) {
                this.no_table = true;
              } else {
                this.no_table = false;
                this.displayed_table = JSON.parse(JSON.stringify(this.vcs_table));
                this.displayed_table.sort((a, b) => (a.row_index > b.row_index) ? 1 : -1);
              }
            }
            this.table_loading = false;
          });
    },

    handle_value_driver_combobox(stakeholder_need) {
      // Checking all value drivers and creating any that are just strings
      const promises = [];
      let error_occurred;
      stakeholder_need.value_drivers.forEach(value_driver_str => {
        if (error_occurred === true) return;
        if (typeof value_driver_str === 'string') {
          promises.push(
              VCSValueDriversService.create_one(this.project.id, {name: value_driver_str})
                  .catch(error => {
                    console.error(error);
                    new Notification('error', `An error occurred when creating the value driver '${value_driver_str}'. Refresh the page and try again.`).push();
                    error_occurred = true;
                  })
                  .then(value_driver => {
                    stakeholder_need.value_drivers.push(value_driver);
                    ValueDrivers.add_to_list(value_driver);
                  }),
          );
        }
      });

      // Removing the originals of the converted value drivers
      if (error_occurred !== true) {
        stakeholder_need.value_drivers = stakeholder_need.value_drivers.filter(item => typeof item !== 'string');
      }

      return Promise.all(promises);
    },

    value_driver_combobox(stakeholder_need) {
      this.$set(stakeholder_need, 'loading', true);
      this.handle_value_driver_combobox(stakeholder_need).then(() => {
        this.$set(stakeholder_need, 'loading', false);
      });
    },

  },

  computed: {
    project() {
      return this.$store.state.Project.active_project;
    },
    value_drivers() {
      return this.$store.state.ValueDrivers.value_driver_list;
    },
    subprocesses() {
      return this.$store.state.Subprocesses.subprocess_list;
    },
    vcs() {
      const vcs = this.$store.state.VCS.active_vcs;
      this.vcs_table = null;
      if (!!vcs) {
        this.get_vcs_table(vcs.id);
      }
      return vcs;
    },
  },

  watch: {
    vcs() {
      // This needs to be here for it too work. No idea why.
    },
  },

};

</script>


<style scoped>

.vcs-table {
  position: relative;
}

.progress-circle {
  --padding: 1em;

  position: fixed;
  top: calc(100px / 2 + 15px + var(--padding)); /* = radius of circle plus thickness of progress bar plus padding */
  right: var(--padding);
  z-index: 1;

  background-color: white;
  border-radius: 50%;
}


.my-table,
.my-table tr,
.my-table th,
.my-table td {
  border-collapse: collapse;
}

.my-table tr {
  border-bottom: 1px solid black;
}

.my-table tbody:hover {
  background-color: #FFFFE0;
}

.my-table th,
.my-table td {
  padding: .125em 1em;
}

.my-table > tr > th,
.my-table > tbody > tr > td {
  border-right: 1px solid black
}


.button-container {
  position: fixed;
  right: 1em;
  top: 5em;
  /*transform: translateX(-50%);*/
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
}

.process-selector-lbl {
  text-decoration: underline;
  cursor: pointer;
}

.process-selector-lbl:hover {
  color: black;
}

tbody:nth-child(odd) {
  background-color: #f7f7f7;
}


tfoot > tr {
  border: none !important;
}

tfoot > tr > td {
  text-align: center;
}

.value-drivers:hover {
  background-color: rgba(0, 0, 0, 5%);
}

.empty-process-select {
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: transform 200ms ease;
}

.empty-process-select:hover {
}

.empty-process-select:hover > * {
  transform: scale(1.25);
}

.no-table-container {
  display: grid;
  place-items: center;
  margin: 4em;
}

</style>

