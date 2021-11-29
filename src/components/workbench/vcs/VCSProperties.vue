<template>
  <div class="vcs-settings pa-2">

    <v-card
        v-if="!!vcs"
        width="500"
        flat
    >
      <v-card-title>Edit VCS properties</v-card-title>
      <v-card-text>
        <v-text-field
            label="Name"
            v-model="vcs.name"
        ></v-text-field>
        <v-textarea
            label="Description"
            v-model="vcs.description"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn>Submit</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>


<script>
export default {
  name: 'VCSProperties',

  props: [
    'vcs',
  ],
};
</script>


<style scoped>

</style>

