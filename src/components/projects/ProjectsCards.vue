<template>
  <div class="project-cards ma-5">

    <v-hover
        v-for="project in projects"
        v-slot="{ hover }"
    >
      <v-card
          width="190"
          height="190"
          :class="{ 'on-hover': hover, ['project-with-id-' + project.id]: true }"
          :to="{ name:'Workbench', project_id: project.id }"
          exact
      >

        <v-img src="https://brokenchalk.org/wp-content/uploads/2021/08/Project-2.png" cover style="height: 60%">
          <v-expand-transition>
            <v-app-bar
                v-show="hover"
                flat
                dense
                style="background: linear-gradient(to bottom, black, transparent)"
            >
              <v-spacer></v-spacer>

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                      icon
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item link @click="duplicate_project(project)">
                    <v-list-item-title>Duplicate</v-list-item-title>
                  </v-list-item>

                  <v-list-item link>
                    <v-list-item-title>Edit</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item link @click="delete_project(project)">
                    <v-list-item-title>Delete</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-app-bar>
          </v-expand-transition>
        </v-img>

        <v-card-title class="one-line pt-2" style="font-size: 1em">
          <v-icon left>mdi-folder</v-icon>
          {{ project.name }}
        </v-card-title>
        <v-card-subtitle v-if="project.concepts === undefined || project.concepts === 0">
          0 design concepts
        </v-card-subtitle>
        <v-card-subtitle v-else-if="project.concepts === 1">
          {{ project.concepts }} design concept
        </v-card-subtitle>
        <v-card-subtitle v-else>
          {{ project.concepts }} design concepts
        </v-card-subtitle>

      </v-card>
    </v-hover>

  </div>
</template>


<script>

import CVSProjectService from '@/services/cvs-project.service';

export default {
  name: 'ProjectsCards',

  props: ['projects'],

  methods: {
    delete_project(project) {
      this.$emit('project-delete', project);
    },

    duplicate_project(project) {
      const new_project = {
        name: project.name + ' - COPY',
        description: project.description,
      };
      CVSProjectService.create_project(new_project)
          .catch(error => {
            console.error(error);
          })
          .then(project => {
            this.$emit('project-created', project);
          });
    },
  },
};

</script>


<style scoped>

.project-cards {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}

.one-line {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
}


</style>