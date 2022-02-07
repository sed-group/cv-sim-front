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

        <v-tabs fixed-tabs v-model="tab" v-if="show_subprocesses === true">
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
                    <v-btn width="200" height="30" small @click="iso_process_selected(1)">
                      Acquisition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(2)">
                      Supply
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #281787">
                  <div>
                    <h3 style="color: #f5f5f5">Project processes</h3>
                    <v-btn width="200" height="30" small @click="iso_process_selected(8)">
                      Project planning
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(9)">
                      Project assessment<br>and control
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(10)">
                      Decision management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(11)">
                      Risk management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(12)">
                      Configuration<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(13)">
                      Information<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(14)">
                      Measurement
                    </v-btn>
                  </div>
                </td>

                <td rowspan="2" style="background-color: #777777">
                  <div>
                    <h3 style="color: #f5f5f5">Technical processes</h3>
                    <v-btn width="200" height="30" small @click="iso_process_selected(15)">
                      Stakeholder<br>requirements definition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(16)">
                      Requirements analysis
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(17)">
                      Architectual design
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(18)">
                      Implementation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(19)">
                      Integration
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(20)">
                      Verification
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(21)">
                      Transition
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(22)">
                      Validation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(23)">
                      Operation
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(24)">
                      Maintenance
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(25)">
                      Disposal
                    </v-btn>
                  </div>
                </td>
              </tr>

              <tr style="background-color: #33741f">
                <td>
                  <div>
                    <h3 style="color: #f5f5f5">Organizational project-<br>-enabling processes</h3>
                    <v-btn width="200" height="30" small @click="iso_process_selected(3)">
                      Life-cycle model<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(4)">
                      Infrastructure<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(5)">
                      Project portfolio<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(6)">
                      Human resource<br>management
                    </v-btn>
                    <v-btn width="200" height="30" small @click="iso_process_selected(7)">
                      Quality management
                    </v-btn>
                  </div>
                </td>
              </tr>

            </table>
          </v-tab-item>

          <v-tab-item key="2" v-if="show_subprocesses === true">
            <div style="height: 504px; padding: 1em 1em 2em; overflow-y: scroll">

              <v-container v-if="!subprocesses" class="fill-height" fluid>
                <v-row justify="center">
                  <v-col align="center">
                    <LoadingAnimaiton></LoadingAnimaiton>
                  </v-col>
                </v-row>
              </v-container>

              <v-list v-else-if="subprocesses.length > 0">
                <template v-for="(process, index) in subprocesses">
                  <v-list-item @click="subprocess_selected(process)">
                    <v-list-item-icon v-if="subprocesses.length !== 1">
                      {{ index + 1 }}
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ process.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Subprocess of <b>{{ process.parent_process.category }}: {{ process.parent_process.name }}</b>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index < subprocesses.length - 1"></v-divider>
                </template>
              </v-list>

              <p v-else class="d-flex justify-center">You have not created any processes yet.</p>

              <!-- CREATE NEW BUTTON -->
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab
                         style="position: absolute; bottom: 3em; right: 2em; z-index: 1"
                         color="primary"
                         v-bind="attrs"
                         v-on="on"
                         @click="button_clicked"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Create new subprocess</span>
              </v-tooltip>

            </div>
          </v-tab-item>

        </v-tabs-items>

      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import Notification from '@/models/utils/Notification';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

export default {
  name: 'VCSProcessSelect',

  components: {LoadingAnimaiton},

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    show_subprocesses: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      tab: null,
    };
  },

  methods: {
    emit_close() {
      this.$emit('close');
    },

    iso_process_selected(id) {
      this.$emit('iso-process-selected', id);
      this.emit_close();
    },

    subprocess_selected(subprocess) {
      this.$emit('subprocess-selected', subprocess);
      this.emit_close();
    },

    button_clicked() {
      new Notification('info', 'This has not been implemented yet.').push();
    },
  },

  watch: {
    show() {
      this.tab = 0; // Making sure first tab always selected from scratch
    },
  },

  computed: {
    subprocesses() {
      return this.$store.state.Subprocesses.subprocess_list;
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

