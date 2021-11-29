<template>
  <div class="vcs-process-select">

    <v-dialog
        v-model="show"
        width="692"
        @click:outside="emit_close"
    >
      <v-card>

        <v-toolbar>
          <v-toolbar-title>Select process</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="emit_close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-tabs fixed-tabs v-model="tab" v-if="show_custom_processes === true">
          <v-tab key="1">ISO 15288 processes</v-tab>
          <v-tab key="2">Created processes</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">

          <v-tab-item key="1">
            <table class="vcs-iso-table">
              <tr>

                <td style="background-color: #bd271e">
                  <div>
                    <h3 style="color: #f5f5f5">Agreement Processes</h3>
                    <v-btn width="200" height="30" small @click="on_process_click(1)">
                      Acquisition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(2)">
                      Supply
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #281787">
                  <div>
                    <h3 style="color: #f5f5f5">Project processes</h3>
                    <v-btn width="200" height="30" small @click="on_process_click(8)">
                      Project planning
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(9)">
                      Project assessment<br>and control
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(10)">
                      Decision management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(11)">
                      Risk management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(12)">
                      Configuration<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(13)">
                      Information<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(14)">
                      Measurement
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #777777">
                  <div>
                    <h3 style="color: #f5f5f5">Technical processes</h3>
                    <v-btn width="200" height="30" small @click="on_process_click(15)">
                      Stakeholder<br>requirements definition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(16)">
                      Requirements analysis
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(17)">
                      Architectual design
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(18)">
                      Implementation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(19)">
                      Integration
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(20)">
                      Verification
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(21)">
                      Transition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(22)">
                      Validation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(23)">
                      Operation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(24)">
                      Maintenance
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(25)">
                      Disposal
                    </v-btn>
                  </div>
                </td>
              </tr>

              <tr style="background-color: #33741f">
                <td>
                  <div>
                    <h3 style="color: #f5f5f5">Organizational project-<br>-enabling processes</h3>
                    <v-btn width="200" height="30" small @click="on_process_click(3)">
                      Life-cycle model<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(4)">
                      Infrastructure<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(5)">
                      Project portfolio<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(6)">
                      Human resource<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="on_process_click(7)">
                      Quality management
                    </v-btn>
                  </div>
                </td>
              </tr>

            </table>
          </v-tab-item>

          <v-tab-item key="2" v-if="show_custom_processes === true">
            <div style="height: 504px; padding: 1em 1em 2em; overflow-y: scroll">
              <v-list v-if="custom_processes.length > 0">
                <template v-for="(process, index) in custom_processes">
                  <v-list-item link>
                    <v-list-item-icon v-if="custom_processes.length !== 1">
                      {{ index + 1 }}
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ process.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Subprocess of <b>{{ process.parent_process.name }} ({{ process.parent_process.group }})</b>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index < custom_processes.length - 1"></v-divider>
                </template>
              </v-list>
              <p v-else class="d-flex justify-center">You have not created any processes yet.</p>
              <v-btn>Create new subprocess</v-btn>
            </div>

          </v-tab-item>

        </v-tabs-items>

      </v-card>
    </v-dialog>

  </div>
</template>


<script>
export default {
  name: 'VCSProcessSelect',

  props: [
    'show',
    'show_custom_processes',
    'custom_processes',
  ],

  data() {
    return {
      tab: null,

      iso_processes: [
        // AGREEMENT PROCESSES
        {id: 1, name: 'Acquisition', group: 'Agreement Processes'},
        {id: 2, name: 'Supply', group: 'Agreement Processes'},

        // ORGANIZATIONAL PROJECT-ENABLING PROCESSES
        {id: 3, name: 'Project planning', group: 'Organizational project-enabling processes'},
        {id: 4, name: 'Project assessment and control', group: 'Organizational project-enabling processes'},
        {id: 5, name: 'Decision management', group: 'Organizational project-enabling processes'},
        {id: 6, name: 'Risk management', group: 'Organizational project-enabling processes'},
        {id: 7, name: 'Configuration management', group: 'Organizational project-enabling processes'},
        {id: 8, name: 'Information management', group: 'Organizational project-enabling processes'},
        {id: 9, name: 'Measurement', group: 'Organizational project-enabling processes'},

        // PROJECT PROCESSES
        {id: 10, name: 'Project planning', group: 'Project processes'},
        {id: 11, name: 'Project assessment and control', group: 'Project processes'},
        {id: 12, name: 'Decision management', group: 'Project processes'},
        {id: 13, name: 'Risk management', group: 'Project processes'},
        {id: 14, name: 'Configuration management', group: 'Project processes'},
        {id: 15, name: 'Information management', group: 'Project processes'},
        {id: 16, name: 'Measurement', group: 'Project processes'},

        // TECHNICAL PROCESSES
        {id: 17, name: 'Stakeholder requirements definition', group: 'Technical processes'},
        {id: 18, name: 'Requirements analysis', group: 'Technical processes'},
        {id: 19, name: 'Architectual design', group: 'Technical processes'},
        {id: 20, name: 'Implementation', group: 'Technical processes'},
        {id: 21, name: 'Integration', group: 'Technical processes'},
        {id: 22, name: 'Verification', group: 'Technical processes'},
        {id: 23, name: 'Transition', group: 'Technical processes'},
        {id: 24, name: 'Validation', group: 'Technical processes'},
        {id: 25, name: 'Operation', group: 'Technical processes'},
        {id: 26, name: 'Maintenance', group: 'Technical processes'},
        {id: 27, name: 'Disposal', group: 'Technical processes'},
      ],

    };
  },

  methods: {
    emit_close() {
      this.$emit('close');
    },

    on_process_click(id) {
      this.$emit('selected-process', id);
      this.emit_close();
    },
  },

  watch: {
    show() {
      this.tab = 0; // Making sure first tab always selected from scratch
    },
  },

};
</script>


<style scoped>

.vcs-iso-table,
.vcs-iso-table tr,
.vcs-iso-table td,
.vcs-iso-table th {
  border: none;
  border-collapse: separate;
  border-spacing: 8px;
}

.vcs-iso-table {
  width: calc(3 * 220px + 2 * 8px);
}

.vcs-iso-table td > div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
}

.vcs-iso-table td {
  width: 220px;
  vertical-align: top;
}

.vcs-iso-table td[rowspan] {
  width: 220px;
  vertical-align: top;
}

</style>

