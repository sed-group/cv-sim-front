<template>
  <div class="workbench-menubar">

    <v-layout>
      <v-col>
        <v-row>
          <v-app-bar-title>
            <span v-if="!!project">{{ project.name }}</span>
          </v-app-bar-title>
        </v-row>

        <v-row>
          <v-menu
              offset-y
              v-for="menu_item in menubar_items"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  text
              >
                {{ menu_item.title }}
                <!-- <v-icon right>mdi-menu-down</v-icon> -->
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                  v-for="(item, index) in menu_item.items"
                  :key="index"
                  link
                  dense
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>

      </v-col>
    </v-layout>
  </div>
</template>


<script>

import CVSProjectService from '@/services/cvs-project.service';

export default {
  name: 'WorkbenchMenubar',
  props: ['menu_items'],

  data: () => ({

    project: null,

    menubar_items: [
      {
        title: 'File',
        items: [
          {title: 'File 1'},
          {title: 'File 2'},
          {title: 'File 3'},
          {title: '...'},
        ],
      },
      {
        title: 'Edit',
        items: [
          {title: 'Edit 1'},
          {title: 'Edit 2'},
          {title: 'Edit 3'},
          {title: '...'},
        ],
      },
      {
        title: 'View',
        items: [
          {title: 'View 1'},
          {title: 'View 2'},
          {title: 'View 3'},
          {title: '...'},
        ],
      },
      {
        title: 'Simulation',
        items: [
          {title: 'Allocate costs'},
          {title: 'Run simulation'},
          {title: 'Inspect results'},
        ],
      },
      {
        title: 'Help',
        items: [
          {title: 'Help 1'},
          {title: 'Help 2'},
          {title: 'Help 3'},
          {title: '...'},
        ],
      },
    ],

  }),

  methods: {
    async get_project() {
      this.project = await CVSProjectService.get_project(this.$route.params.project_id);
    },
  },

  mounted() {
    this.get_project();
  },
};

</script>


<style scoped>

.no-uppercase {
  text-transform: none;
}

</style>