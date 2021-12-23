<template>
  <v-container v-if="table_loading === true" fill-height fluid style="min-height: 500px">
    <v-row justify="center">
      <v-col align="center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </v-col>
    </v-row>
  </v-container>

  <div v-else-if="no_table === true">no table :(</div>

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
          <v-btn :color="edit === true ? 'success' : null" @click="edit_clicked">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </v-card>
      </v-fade-transition>

      <v-fade-transition leave-absolute>
        <v-card v-show="edit">
          <v-btn :loading="save_loading" @click="save_clicked" :disabled="!edit && !save_loading">
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
            <th v-bind="attrs" v-on="on" style="width: 300px">Stakeholder expectaions</th>
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
            <th v-bind="attrs" v-on="on" style="width: 170px">Stakeholder needs</th>
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
            <th v-bind="attrs" v-on="on" style="width: 40px">Rank weight</th>
          </template>
          <span>
            The relative importance of the Stakeholder Needs, used to create a profile of interest for a study (Value
            Creation Strategy).
          </span>
        </v-tooltip>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on" style="width: 150px">Value Drivers</th>
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
            <div>
              <v-btn icon>
                <v-icon>mdi-arrow-up-thick</v-icon>
              </v-btn>
            </div>
            <div>
              <v-btn icon>
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>
            </div>
          </td>

          <!-- PROCESS -->
          <td v-if="edit" :rowspan="row.stakeholder_needs.length + 1">

            <v-tooltip v-if="!!row.iso_process" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-list>
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
                <v-list>
                  <v-list-item @click="select_process(row.id)" v-bind="attrs" v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.subprocess.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ row.subprocess.parent_process.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>Subprocess of ISO process</span>
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
                <v-list class="transparent">
                  <v-list-item v-bind="attrs" v-on="on" link>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ row.subprocess.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ row.subprocess.parent_process.name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
              <span>Subprocess of ISO process</span>
            </v-tooltip>

            <span v-else></span>
          </td>


          <!-- STAKEHOLDER -->
          <td v-if="edit" :rowspan="row.stakeholder_needs.length + 1">
            <v-text-field v-model="row.stakeholder"
                          placeholder="Stakeholder"
            ></v-text-field>
          </td>
          <td v-else :rowspan="row.stakeholder_needs.length">{{ row.stakeholder.toUpperCase() }}</td>

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
            <v-select
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
            ></v-select>
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
            <v-select v-if="edit"
                      :items="value_drivers"
                      item-text="name"
                      item-value="id"
                      chips
                      placeholder="Value drivers"
                      multiple
                      dense
                      deletable-chips
            ></v-select>
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

  </div>

</template>


<script>
import VCSProcessSelect from '@/components/workbench/vcs/VCSProcessSelect';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';
import Notification from '@/models/utils/Notification';
import ISOProcesses from '@/models/ISOProcesses';

import CVSVCSService from '@/services/cvs-vcs.service';
import VCSValueDriversService from '@/services/vcs-value-drivers.service';

export default {
  name: 'VCSTable',

  props: {
    vcs_id: {
      type: Number,
    },
    vcs_table: {
      type: Array,
    },
  },

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

      displayed_table: null,
      value_drivers: null,

      rules: {
        rank_weight: [
          v => v >= 0 || 'Should be positive',
        ],
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
      console.log(iso_process);
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
      // todo: sort based on row index
    },
    save_clicked() {
      console.log(this.displayed_table);
      this.save_loading = true;

      // Checking and cleaning provided table data
      for (const row of this.displayed_table) {
        row.stakeholder = row.stakeholder.toUpperCase();

        for (const stakeholder_need of row.stakeholder_needs) {
          if (stakeholder_need.rank_weight === '') {
            stakeholder_need.rank_weight = 0;
          }
        }
      }

      // Creating request model
      const table_rows = [];
      for (const row of this.displayed_table) {
        const new_row = {};

        if (row.iso_process) {
          new_row.iso_process_id = row.iso_process.id;
        } else if (row.subprocess) {
          new_row.subprocess_id = row.subprocess.id;
        }

        new_row.stakeholder = row.stakeholder;

        new_row.stakeholder_expectations = row.stakeholder_expectations;

        new_row.stakeholder_needs = row.stakeholder_needs.map(stakeholder_need => {
          return {
            need: stakeholder_need.need,
            rank_weight: stakeholder_need.rank_weight,
            value_driver_ids: stakeholder_need.value_drivers.map(x => x.id),
          };
        });

        console.log(new_row);

        table_rows.push(new_row);
      }

      CVSVCSService.create_vcs_table(this.$route.params.project_id, this.vcs_id, table_rows)
          .catch(error => {
            console.error(error);
            new Notification('error', error);
          })
          .then(response => {
            if (response === true) {
              this.save_loading = false;
              this.edit = false;
              new Notification('success', 'Successfully created table.').push();
            } else {
              this.displayed_table = this.vcs_table.slice();
              new Notification('error',
                  'For some reason, the table creation failed. Please refresh the page and try again.',
              ).push();
              this.save_loading = false;
              this.edit = false;
            }
          });
    },

    get_value_drivers() {
      this.value_drivers = null;
      const project_id = this.$route.params.project_id;
      VCSValueDriversService.get_all(project_id)
          .catch(error => {
            console.error(error);
            Notification.emit_standard_error_message();
          })
          .then(response => {
            const value_drivers = response.chunk;
            if (!!value_drivers) {
              this.value_drivers = value_drivers;
              this.value_drivers.sort((a, b) => (a.id > b.id) ? 1 : -1);
            }
          });
    },

    add_row() {
      const empty_stakeholder_needs = [{
        need: '',
        rank_weight: 0,
        value_drivers: new Array(0),
      }];
      const empty_row = {
        iso_process: null,
        subprocess: null,
        stakeholder: '',
        stakeholder_expectations: null,
        stakeholder_needs: empty_stakeholder_needs,
      };
      this.displayed_table.push(empty_row);
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

  },

  watch: {
    vcs_table() {
      this.get_value_drivers();
      this.edit = false;
      this.table_loading = true;
      if (this.vcs_table.length === 0) {
        this.no_table = true;
      } else {
        this.no_table = false;
        this.displayed_table = this.vcs_table.slice();
        // todo: sort based on row index
      }
      setTimeout(() => { // need a delay for it to show, don't know why
        this.table_loading = false;
      }, 500);
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
  background-color: #eeeeee;
}

.my-table th,
.my-table td {
  padding: .125em 1em;
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


tfoot > tr {
  border: none !important;
}

tfoot > tr > td {
  text-align: center;
}

.value-drivers:hover {
  text-decoration: underline;
  color: black;
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

</style>

