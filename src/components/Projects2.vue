<template>
  <div class="projects">

    <v-btn class="my-2 mx-5" small>Edit default life cycle</v-btn>
    <v-btn class="my-2 mx-5" small>Open concept generator</v-btn>
    <v-btn class="my-2 mx-5" small>Link concepts to life cycle</v-btn>

    <!--
    <v-list
        dense
        expand
    >
      <v-list-group
          v-for="(project, i) in projects"
          :key="i"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ project.name }}</v-list-item-title>
        </template>

        <v-list-item disabled>
          <v-list-item-content>
            <v-list-item-title>{{ project.lifecycle }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            v-for="(concept, j) in project.concepts"
            :key="j"
        >
          <v-list-item-content>
            <v-list-item-title>{{ concept.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-btn x-small>+ Concept</v-btn>
        </v-list-item>

      </v-list-group>
    </v-list>
    -->

    <v-list
        dense
        expand
    >
      <v-list-item v-for="concept in concepts" link>
        <v-list-item-content>
          <v-list-item-title>{{ concept }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon small>
            <v-icon>mdi-connection</v-icon>
          </v-btn>
        </v-list-item-action>

      </v-list-item>


      <v-btn small class="ma-5">Create new concept</v-btn>

    </v-list>


  </div>
</template>


<script>

export default {
  name: 'Projects2',

  data: () => ({
    selectedItem: 1,

    // hard coded examples

    concepts: [
      'Concept A',
      'Concept B',
      'Concept C',
      'Concept D',
      'Concept E',
      'Concept F',
      'Concept G',
    ],


    projects: [
      {
        name: 'Gas turbine',
        lifecycle: 'Default lifecycle',
        concepts: [
          {name: 'Concept A'},
          {name: 'Concept B'},
        ],
      },
      {
        name: 'Satellite',
        lifecycle: 'Default lifecycle',
        concepts: [
          {name: 'Concept A'},
          {name: 'Concept B'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
          {name: 'Concept C'},
        ],
      },
      {
        name: 'Glue gun',
        lifecycle: 'Default lifecycle',
        concepts: [
          {name: 'Concept A'},
        ],
      },
      {
        name: 'Nuclear reactor',
        lifecycle: 'Default lifecycle',
        concepts: [],
      },
    ],

  }),
};

</script>


<style scoped>

</style>