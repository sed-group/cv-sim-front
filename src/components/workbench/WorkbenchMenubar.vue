<template>

  <v-layout>
    <v-col>
      <v-row>

        <v-col>
          <v-row class="pt-2">
            <router-link :to="{ name: 'Dashboard' }" class="mr-4">
              <v-img
                  src="@/assets/logo-small.svg"
                  alt="CV-S logo"
                  contain
                  height="30"
                  width="40"
                  v-ripple
                  style="margin: 0;padding: 0"
              ></v-img>
            </router-link>
            <div class="text-h6 font-weight-regular" v-if="!!project">{{ project.name }}</div>
            <div class="text-h6 font-weight-regular" v-else style="opacity: 0">...</div>
          </v-row>

          <v-row>

            <!-- FILE -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text>File</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-folder-plus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>New</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-folder-open-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Open</v-list-item-title>
                </v-list-item>

                <v-list-item exact dense :to="{ name: 'Dashboard' }">
                  <v-list-item-icon></v-list-item-icon>
                  <v-list-item-title>Close</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Import</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Export</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

            <!-- EDIT -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text>Edit</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-undo</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Undo</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-redo</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Redo</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-content-cut</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Cut</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-content-copy</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Copy</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-content-paste</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Paste</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

            <!-- VIEW -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text>View</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-magnify-plus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Zoom in</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-magnify-minus-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Zoom out</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-fit-to-screen-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Zoom to fit</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link dense exact @click.stop="checkbox_grid = !checkbox_grid">
                  <v-list-item-icon>
                    <v-icon v-if="checkbox_grid === true">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Show grid</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact @click.stop="toggle_details">
                  <v-list-item-icon>
                    <v-icon v-if="checkbox_details === true">mdi-check</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Show details</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

            <!-- VCS -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text>VCS</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item link dense exact @click="$emit('manage-value-drivers')">
                  <v-list-item-icon></v-list-item-icon>
                  <v-list-item-title>Manage value drivers</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact @click="$emit('manage-subprocesses')">
                  <v-list-item-icon></v-list-item-icon>
                  <v-list-item-title>Manage subprocesses</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

            <!-- SIMULATION -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text>Simulation</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item link dense exact>
                  <v-list-item-icon></v-list-item-icon>
                  <v-list-item-title>Allocate costs</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-cog-play-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Run simulation</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact href="https://www.google.com/" target="_blank">
                  <v-list-item-icon>
                    <v-icon>mdi-card-search-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Inspect results</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

            <!-- HELP -->
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" small text @click="help_search_select = null">Help</v-btn>
              </template>
              <v-list :min-width="menu_min_width">

                <v-list-item dense>
                  <v-autocomplete
                      v-model="help_search_select"
                      label="Search"
                      :items="help_search_items"
                      dense
                      flat
                      hide-details
                      solo
                      auto-select-first
                      prepend-inner-icon="mdi-magnify"
                      outlined
                  ></v-autocomplete>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-alert</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Report a problem</v-list-item-title>
                </v-list-item>

                <v-list-item link dense exact>
                  <v-list-item-icon>
                    <v-icon>mdi-help</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Open help</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

          </v-row>
        </v-col>

      </v-row>
    </v-col>

    <v-col class="d-flex justify-end">
      <LoggedInUserInfo :user="user"></LoggedInUserInfo>
    </v-col>

  </v-layout>
</template>


<script>

import LoggedInUserInfo from '@/components/user/LoggedInUserInfo';

export default {
  name: 'WorkbenchMenubar',

  components: {LoggedInUserInfo},

  props: {
    project: Object,
    user: Object,
    checkbox_details: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    menu_min_width: 250,
    checkbox_grid: true,
    help_search_select: '',
    help_search_items: [
      'File > New',
      'File > Open',
      'File > Close',
      'File > Import',
      'File > Export',
      'Edit > Undo',
      'Edit > Redo',
      'Edit > Cut',
      'Edit > Copy',
      'Edit > Paste',
      'View > Zoom in',
      'View > Zoom out',
      'View > Zoom to fit',
      'View > Show grid',
      'Simulation > Allocate costs',
      'Simulation > Run simulation',
      'Simulation > Inspect results',
    ],

  }),

  methods: {
    toggle_details() {
      this.$emit('toggle-details');
    },
  },

};

</script>


<style scoped>

.no-uppercase {
  text-transform: none;
}

</style>