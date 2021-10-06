<template>
  <div class="projects-list">

    <v-list
        subheader
        class="mx-5 mt-1"
    >

      <v-hover v-for="(project, index) in projects" v-slot="{ hover }">
        <v-list-item
            :class="'project-with-id-' + project.id"
            :to="{ name:'Workbench', params: { project_id: project.id } }"
            exact
        >

          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-if="!!project.name">{{ project.name }}</v-list-item-title>
            <v-list-item-title v-else>Unnamed project</v-list-item-title>
            <v-list-item-subtitle v-if="!!project.description">{{ project.description }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-fade-transition>
            <v-list-item-action v-show="hover" class="pr-5">
              <v-btn text :to="{ name:'Workbench', project_id: project.id }" exact>Open</v-btn>
            </v-list-item-action>
          </v-fade-transition>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn
                icon
                @click="delete_project(project)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>

        </v-list-item>
      </v-hover>

    </v-list>

  </div>
</template>


<script>

export default {
  name: 'ProjectsList',

  props: ['projects'],

  methods: {
    delete_project(project) {
      this.$emit('project-delete', project);
    },
  },

};
</script>


<style scoped>

</style>