<template>
  <div class="details-box">

    <v-toolbar>
      <v-toolbar-title>Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <div style="padding: 1em">

      <h4>Concept A</h4>

      <v-text-field
          label="Name"
          value="Pre-processing"
          type="text"
          clearable
      ></v-text-field>

      <v-text-field
          label="Design parameter A"
          value="5000"
          type="number"
          clearable
      ></v-text-field>

      <v-text-field
          label="Design parameter B"
          value="100"
          type="number"
          clearable
      ></v-text-field>

      <v-textarea
          label="Description"
          type="text"
          clearable
      ></v-textarea>

    </div>

  </div>
</template>


<script>

import CVSProjectService from '@/services/cvs-project.service';

export default {
  name: 'DetailsBox',

  data: () => ({}),

  methods: {
    close() {
      this.$emit('close');
    },
  },

};

</script>


<style scoped>

h4 {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  margin: 1em 0 1em 0;

  /*padding: .25em;*/
  /*border: 2px solid #3376cb;*/
}

</style>