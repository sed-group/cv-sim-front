<template>
  <div class="project-view">

    <v-navigation-drawer
        app
        permanent
        class="align-center pt-5"
    >
      <v-btn>+ Project</v-btn>
    </v-navigation-drawer>

    <Projects :projects="projects"></Projects>


  </div>
</template>


<script>
import Projects from "@/components/projectview/Projects";

export default {
  name: "ProjectView",

  components: {
    Projects,
  },

  data: () => ({
    user: {
      username: 'admin',
    },
    projects: [
      {name: 'Satellite 1', concepts: Math.round(Math.random() * 10000), img: require('@/assets/img1.png')},
      {name: 'Satellite 2', concepts: Math.round(Math.random() * 10000), img: require('@/assets/img2.png')},
      {name: 'Satellite 3', concepts: Math.round(Math.random() * 10000), img: require('@/assets/img3.jpeg')},
      {name: 'Satellite 4a', concepts: Math.round(Math.random() * 10000), img: require('@/assets/img4.png')},
      {name: 'Satellite 4b', concepts: 0, img: require('@/assets/img4.png')},
      {name: 'Satellite 4c', concepts: 1, img: require('@/assets/img4.png')},
    ],
  }),

}
</script>


<style scoped>

</style>

