<template>
  <div class="project-cards ma-5" style="padding-bottom: 8em">

    <v-hover v-for="project in projects"
             v-slot="{ hover }"
             open-delay="400"
             close-delay="400"
    >
      <v-card width="190"
              height="190"
              :class="{ 'on-hover': hover, ['project-with-id-' + project.id]: true }"
              :to="{ name: 'Workbench', params: { project_id: project.id } }"
              exact
      >

        <v-expand-transition>
          <v-bottom-navigation v-show="hover"
                               dense
                               absolute
                               style="position: absolute; top: 0; left: 0"
                               @click.prevent
          >
            <v-btn :to.prevent="{ name: 'Workbench', params: { project_id: project.id } }">Open</v-btn>
            <v-spacer @click.prevent style="cursor: default"></v-spacer>
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="black"
                       v-bind="attrs"
                       v-on="on"
                       icon
                       @click.prevent
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item link @click.prevent="duplicate_project(project)">
                  <v-list-item-title>Duplicate</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item link @click.prevent="edit_project(project)">
                  <v-list-item-title>Edit</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item link @click.prevent="delete_project(project)">
                  <v-list-item-title>Delete</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-bottom-navigation>
        </v-expand-transition>

        <div style="height: 60%; display: grid; place-items: center; background-color: #e5e5e5">
          <v-icon size="40">mdi-hammer-wrench</v-icon>
        </div>

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


    <!-- Wireframe "create new project" card -->
    <v-card
        class="ghost-card"
        width="190"
        height="190"
        flat
        link
        @click="$emit('open-project-form')"
    >
      <div class="content">
        <v-icon color="#c5c5c5" size="50">mdi-plus</v-icon>
        <span>Create new project</span>
      </div>
    </v-card>

  </div>
</template>


<script>

import CVSProjectService from '@/services/cvs-project.service';

export default {
  name: 'ProjectsCards',

  props: ['projects'],

  data: () => ({}),

  methods: {
    edit_project(project) {
      this.$emit('project-edit', project);
    },

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


/* GHOST CARD */
.ghost-card {
  --clr: #c5c5c5;
  --border-size: 2px;

  display: grid;
  place-items: center;

  border: var(--border-size) dashed var(--clr);
}

.ghost-card .content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;

  color: var(--clr);
  font-size: 1.15em;
}

</style>