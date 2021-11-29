<template>
  <v-container v-if="vcs_table.length === 0" fill-height fluid style="min-height: 500px">
    <v-row justify="center">
      <v-col align="center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </v-col>
    </v-row>
  </v-container>

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

    <v-switch v-model="edit" label="Enable editing"></v-switch>
    <v-btn :loading="loading" @click="loading = true">
      Save changes
      <template v-slot:loader>
        <span>Saving...</span>
      </template>
    </v-btn>


    <table class="my-table" v-if="!!vcs_table">
      <tr>
        <th style="width: 100px">Process</th>
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
            <th v-bind="attrs" v-on="on">Stakeholder needs</th>
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
            <th v-bind="attrs" v-on="on">Rank weight</th>
          </template>
          <span>
            The relative importance of the Stakeholder Needs, used to create a profile of interest for a study (Value
            Creation Strategy).
          </span>
        </v-tooltip>

        <v-tooltip bottom max-width="400">
          <template v-slot:activator="{ on ,attrs}">
            <th v-bind="attrs" v-on="on">Value Drivers</th>
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

      <tbody v-for="row in vcs_table"
             :id="'vcs_table_row_id-'+row.id"
      >
        <tr>
          <!-- PROCESS -->
          <td v-if="!!row.iso_process && edit === true">

          </td>
          <td :rowspan="row.stakeholder_needs.length" v-if="!!row.iso_process">{{ row.iso_process.name }}</td>
          <td :rowspan="row.stakeholder_needs.length" v-else-if="!!row.subprocess">
            {{ row.subprocess.parent_process }}: {{ row.subprocess.name }}
          </td>
          <td :rowspan="row.stakeholder_needs.length" v-else>...</td>

          <!-- STAKEHOLDER -->
          <td v-if="edit === true" :rowspan="row.stakeholder_needs.length">
            <v-text-field
                placeholder="Stakeholder"
                :value="row.stakeholder.toUpperCase()"
            ></v-text-field>
          </td>
          <td v-else :rowspan="row.stakeholder_needs.length">{{ row.stakeholder.toUpperCase() }}</td>

          <!-- STAKEHOLDER EXPECTATIONS -->
          <td v-if="edit === true" :rowspan="row.stakeholder_needs.length">
            <v-textarea
                placeholder="Stakeholder expectations"
                :value="row.stakeholder_expectations"
                auto-grow
                no-resize
            ></v-textarea>
          </td>
          <td :rowspan="row.stakeholder_needs.length" v-else>{{ row.stakeholder_expectations }}</td>

          <!-- STAKEHOLDER NEEDS -->
          <td v-if="edit === true">
            <v-text-field
                placeholder="Stakeholder need"
                :value="row.stakeholder_needs[0].need"
            ></v-text-field>
          </td>
          <td v-else>{{ row.stakeholder_needs[0].need }}</td>

          <!-- RANK WEIGHTS -->
          <td>{{ row.stakeholder_needs[0].rank_weight }}</td>

          <!-- VALUE DRIVERS -->
          <td>
            <ul>
              <li v-for="value_driver in row.stakeholder_needs[0].value_drivers">{{ value_driver.name }}</li>
            </ul>
          </td>

        </tr>

        <tr v-for="stakeholder_need in row.stakeholder_needs.slice(1)">

          <!-- STAKEHOLDER NEEDS -->
          <td v-if="edit === true">
            <v-text-field
                placeholder="Stakeholder need"
                :value="stakeholder_need.need"
            ></v-text-field>
          </td>
          <td v-else>{{ stakeholder_need.need }}</td>

          <!-- RANK WEIGHTS -->
          <td>{{ stakeholder_need.rank_weight }}</td>

          <!-- VALUE DRIVERS -->
          <td>
            <ul>
              <li v-for="value_driver in stakeholder_need.value_drivers">{{ value_driver.name }}</li>
            </ul>
          </td>

        </tr>
      </tbody>

    </table>


    <VCSProcessSelect
        :show="show_process_select"
        @close="on_close_process_select"
        :custom_processes="custom_processes"
        :show_custom_processes="true"
        @selected-process="on_process_selected"
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
import VCSProcessSelect from '@/components/workbench/vcs/iso_processes/VCSProcessSelect';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

export default {
  name: 'VCSTable',

  props: {
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

      progress: 0,
      open_dialog: false,
      custom_processes: [],

      loading: false,
      edit: false,
    };
  },

  methods: {
    on_close_process_select() {
      this.show_process_select = false;
    },
    on_process_selected() {
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
  border-bottom: 1px solid black;
  border-collapse: collapse;
}

.my-table tbody:hover {
  background-color: #eeeeee;
}

.my-table th,
.my-table td {
  padding: .125em 1em;
}

</style>

