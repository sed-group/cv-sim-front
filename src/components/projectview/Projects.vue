<template>
  <div class="hej">

    <v-card v-for="project in projects" width="300" height="200" v-ripple>
      <v-img :src="project.img" height="100" contain></v-img>
      <v-card-title class="one-line">
        <v-icon left>mdi-folder</v-icon>
        {{ project.name }}
      </v-card-title>
      <v-card-subtitle v-if="project.concepts === 1">{{ project.concepts }} design concept</v-card-subtitle>
      <v-card-subtitle v-else>{{ project.concepts }} design concepts</v-card-subtitle>
    </v-card>

  </div>
</template>


<script>

export default {
  name: "Projects",
  props: ['projects'],
}

</script>


<style scoped>

.hej {
  margin: 2em;

  display: flex;
  gap: 2em;
  flex-wrap: wrap;
}

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>

