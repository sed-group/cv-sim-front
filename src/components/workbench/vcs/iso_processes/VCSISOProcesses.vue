<template>
  <div class="vcs-iso-processes">

    <v-btn @click="test1 = true" class="ma-5">Test 1</v-btn>
    <v-btn @click="test2 = true" class="ma-5">Test 2</v-btn>
    <v-btn @click="test3 = true" class="ma-5">Test 3</v-btn>
    <v-btn @click="test4 = true" class="ma-5">Test 4</v-btn>


    <v-dialog v-model="test1" width="692">
      <v-card>
        <v-card-title class="d-flex justify-center">ISO 15288</v-card-title>
        <table class="vcs-iso-table">
          <tr>

            <td style="background-color: #bd271e">
              <div>
                <h3 style="color: #f5f5f5">Agreement Processes</h3>
                <v-btn width="200" height="30" small>
                  Acquisition process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Supply process
                </v-btn>
              </div>
            </td>

            <td rowspan="2" style="background-color: #281787">
              <div>
                <h3 style="color: #f5f5f5">Project processes</h3>
                <v-btn width="200" height="30" small>
                  Project planning<br>process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project assessment<br>and control process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Decision management<br>process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Risk management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Configuration<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Information<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Measurement process
                </v-btn>
              </div>
            </td>

            <td rowspan="2" style="background-color: #777777">
              <div>
                <h3 style="color: #f5f5f5">Technical processes</h3>
                <v-btn width="200" height="30" small>
                  Stakeholder requirements<br>definition process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Requirements analysis<br>process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Architectual design<br> process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Implementation process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Integration process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Verification process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Transition process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Validation process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Operation process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Maintenance process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Disposal process
                </v-btn>
              </div>
            </td>
          </tr>

          <tr style="background-color: #33741f">
            <td>
              <div>
                <h3 style="color: #f5f5f5">Organizational project-<br>-enabling processes</h3>
                <v-btn width="200" height="30" small>
                  Life-cycle model<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Infrastructure<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project portfolio<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Human resource<br>management process
                </v-btn>
                <v-btn width="200" height="30" small>
                  Quality management<br>process
                </v-btn>
              </div>
            </td>
          </tr>

        </table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="test2" width="692">
      <v-card>
        <v-card-title class="d-flex justify-center">ISO 15288</v-card-title>
        <table class="vcs-iso-table">
          <tr>

            <td style="background-color: #bd271e">
              <div>
                <h3 style="color: #f5f5f5">Agreement Processes</h3>
                <v-btn width="200" height="30" small>
                  Acquisition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Supply
                </v-btn>
              </div>
            </td>

            <td rowspan="2" style="background-color: #281787">
              <div>
                <h3 style="color: #f5f5f5">Project processes</h3>
                <v-btn width="200" height="30" small>
                  Project planning
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project assessment<br>and control
                </v-btn>
                <v-btn width="200" height="30" small>
                  Decision management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Risk management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Configuration<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Information<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Measurement
                </v-btn>
              </div>
            </td>

            <td rowspan="2" style="background-color: #777777">
              <div>
                <h3 style="color: #f5f5f5">Technical processes</h3>
                <v-btn width="200" height="30" small>
                  Stakeholder<br>requirements definition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Requirements analysis
                </v-btn>
                <v-btn width="200" height="30" small>
                  Architectual design
                </v-btn>
                <v-btn width="200" height="30" small>
                  Implementation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Integration
                </v-btn>
                <v-btn width="200" height="30" small>
                  Verification
                </v-btn>
                <v-btn width="200" height="30" small>
                  Transition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Validation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Operation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Maintenance
                </v-btn>
                <v-btn width="200" height="30" small>
                  Disposal
                </v-btn>
              </div>
            </td>
          </tr>

          <tr style="background-color: #33741f">
            <td>
              <div>
                <h3 style="color: #f5f5f5">Organizational project-<br>-enabling processes</h3>
                <v-btn width="200" height="30" small>
                  Life-cycle model<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Infrastructure<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project portfolio<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Human resource<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Quality management
                </v-btn>
              </div>
            </td>
          </tr>

        </table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="test3" width="692">
      <v-card style="background-color: #f5f5f5">
        <v-card-title class="d-flex justify-center">ISO 15288</v-card-title>
        <table class="vcs-iso-table">
          <tr>

            <td style="background-color: white; box-shadow: 0 3px 1px -2px rgb(0, 0, 0, 0.2), 0 2px 2px 0 rgb(0, 0, 0, 0.14), 0 1px 5px 0 rgb(0, 0, 0, 0.12);">
              <div>
                <h3 style="color: #202020">Agreement Processes</h3>
                <v-btn width="200" height="30" small>
                  Acquisition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Supply
                </v-btn>
              </div>
            </td>

            <td rowspan="2"
                style="background-color: white; box-shadow: 0 3px 1px -2px rgb(0, 0, 0, 0.2), 0 2px 2px 0 rgb(0, 0, 0, 0.14), 0 1px 5px 0 rgb(0, 0, 0, 0.12);">
              <div>
                <h3 style="color: #202020">Project processes</h3>
                <v-btn width="200" height="30" small>
                  Project planning
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project assessment<br>and control
                </v-btn>
                <v-btn width="200" height="30" small>
                  Decision management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Risk management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Configuration<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Information<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Measurement
                </v-btn>
              </div>
            </td>

            <td rowspan="2"
                style="background-color: white; box-shadow: 0 3px 1px -2px rgb(0, 0, 0, 0.2), 0 2px 2px 0 rgb(0, 0, 0, 0.14), 0 1px 5px 0 rgb(0, 0, 0, 0.12);">
              <div>
                <h3 style="color: #202020">Technical processes</h3>
                <v-btn width="200" height="30" small>
                  Stakeholder<br>requirements definition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Requirements analysis
                </v-btn>
                <v-btn width="200" height="30" small>
                  Architectual design
                </v-btn>
                <v-btn width="200" height="30" small>
                  Implementation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Integration
                </v-btn>
                <v-btn width="200" height="30" small>
                  Verification
                </v-btn>
                <v-btn width="200" height="30" small>
                  Transition
                </v-btn>
                <v-btn width="200" height="30" small>
                  Validation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Operation
                </v-btn>
                <v-btn width="200" height="30" small>
                  Maintenance
                </v-btn>
                <v-btn width="200" height="30" small>
                  Disposal
                </v-btn>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: white; box-shadow: 0 3px 1px -2px rgb(0, 0, 0, 0.2), 0 2px 2px 0 rgb(0, 0, 0, 0.14), 0 1px 5px 0 rgb(0, 0, 0, 0.12);">
              <div>
                <h3 style="color: #202020">Organizational project-<br>-enabling processes</h3>
                <v-btn width="200" height="30" small>
                  Life-cycle model<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Infrastructure<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Project portfolio<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Human resource<br>management
                </v-btn>
                <v-btn width="200" height="30" small>
                  Quality management
                </v-btn>
              </div>
            </td>
          </tr>

        </table>
      </v-card>
    </v-dialog>

    <v-dialog v-model="test4" width="692">
      <v-card>

        <v-toolbar>
          <v-toolbar-title>Select process</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-tabs fixed-tabs v-model="tab">
          <v-tab key="1">ISO 15288 processes</v-tab>
          <v-tab key="2">Your processes</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="1">
            <table class="vcs-iso-table">
              <tr>

                <td style="background-color: #bd271e">
                  <div>
                    <h3 style="color: #f5f5f5">Agreement Processes</h3>
                    <v-btn width="200" height="30" small>
                      Acquisition
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Supply
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #281787">
                  <div>
                    <h3 style="color: #f5f5f5">Project processes</h3>
                    <v-btn width="200" height="30" small>
                      Project planning
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Project assessment<br>and control
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Decision management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Risk management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Configuration<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Information<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Measurement
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #777777">
                  <div>
                    <h3 style="color: #f5f5f5">Technical processes</h3>
                    <v-btn width="200" height="30" small>
                      Stakeholder<br>requirements definition
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Requirements analysis
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Architectual design
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Implementation
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Integration
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Verification
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Transition
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Validation
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Operation
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Maintenance
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Disposal
                    </v-btn>
                  </div>
                </td>
              </tr>

              <tr style="background-color: #33741f">
                <td>
                  <div>
                    <h3 style="color: #f5f5f5">Organizational project-<br>-enabling processes</h3>
                    <v-btn width="200" height="30" small>
                      Life-cycle model<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Infrastructure<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Project portfolio<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Human resource<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small>
                      Quality management
                    </v-btn>
                  </div>
                </td>
              </tr>

            </table>
          </v-tab-item>

          <v-tab-item key="2">
            <div style="height: 504px; padding: 1em 1em 2em; overflow-y: scroll">
              <v-list v-if="custom_processes.length > 0">
                <template v-for="(process, index) in custom_processes">
                  <v-list-item link>
                    <v-list-item-icon v-if="custom_processes.length !== 1">
                      {{ index + 1 }}
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ process.name }}</v-list-item-title>
                      <v-list-item-subtitle>Subprocess of "{{ process.parent_process }}"</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index < custom_processes.length - 1"></v-divider>
                </template>
              </v-list>
              <p v-else class="d-flex justify-center">You have not created any processes yet.</p>
            </div>
          </v-tab-item>

        </v-tabs-items>

      </v-card>
    </v-dialog>

  </div>
</template>


<script>
export default {
  name: 'VCSISOProcesses',

  data() {
    return {
      tab: null,

      test1: false,
      test2: false,
      test3: false,
      test4: false,

      custom_processes: [
        {id: 0, name: 'My phase A', parent_process: 0},
        {id: 1, name: 'My phase B', parent_process: 1},
        {id: 2, name: 'My phase C', parent_process: 2},
        {id: 3, name: 'My phase D', parent_process: 3},
      ],

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

    };
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

