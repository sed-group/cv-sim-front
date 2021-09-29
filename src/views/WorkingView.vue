<template>

  <div class="working-view">

    <SystemBar :user="user"></SystemBar>

    <v-app-bar app clipped-left clipped-right>
      <Menubar :menu_items="menu_items"></Menubar>
    </v-app-bar>

    <v-navigation-drawer app clipped permanent id="project-element-container">
      <ProjectElementContainer></ProjectElementContainer>
    </v-navigation-drawer>

    <v-navigation-drawer app right clipped permanent id="details-box">
      <DetailsBox></DetailsBox>
    </v-navigation-drawer>

    <Footer></Footer>

  </div>

</template>


<script>

import Menubar from "@/components/Menubar";
import DetailsBox from "@/components/DetailsBox";
import WorkArea from "@/components/WorkArea";
import ProjectElementContainer from "@/components/ProjectElementContainer";
import SystemBar from "@/components/SystemBar";

export default {
  name: 'WorkingView',

  components: {
    Menubar,
    DetailsBox,
    WorkArea,
    ProjectElementContainer,
    SystemBar,
  },

  data: () => ({

    user: {
      username: 'admin',
    },

    // hard coded items of the menubar
    menu_items: [
      {
        title: 'File',
        type: 'menu',
        items: [
          {title: 'File 1'},
          {title: 'File 2'},
          {title: 'File 3'},
          {title: '...'},
        ],
      },

      {
        title: 'Edit',
        type: 'menu',
        items: [
          {title: 'Edit 1'},
          {title: 'Edit 2'},
          {title: 'Edit 3'},
          {title: '...'},
        ],
      },

      {
        title: 'View',
        type: 'menu',
        items: [
          {title: 'View 1'},
          {title: 'View 2'},
          {title: 'View 3'},
          {title: '...'},
        ],
      },

      {
        title: 'Allocate costs',
        type: 'menu',
        items: [
          {title: 'Allocate costs 1'},
          {title: 'Allocate costs 2'},
          {title: 'Allocate costs 3'},
          {title: '...'},
        ],
      },

      {
        title: 'Run simulation',
        type: 'menu',
        items: [
          {title: 'Run simulation 1'},
          {title: 'Run simulation 2'},
          {title: 'Run simulation 3'},
          {title: '...'},
        ],
      },

      {
        title: 'Inspect results',
        type: 'new-tab',
      },

      {
        title: 'Simulation',
        type: 'menu',
        items: [
          {title: 'Allocate costs'},
          {title: 'Run simulation'},
          {title: 'Inspect results'},
        ],
      },

      {
        title: 'Help',
        type: 'menu',
        items: [
          {title: 'Help 1'},
          {title: 'Help 2'},
          {title: 'Help 3'},
          {title: '...'},
        ],
      },

    ],

  }),
}

</script>


<style scoped>

.working-view {
  width: 200vw;
  height: 200vh;
  background: url('http://i.stack.imgur.com/GySvQ.png');
  background-size: 10px;
}

#details-box,
#project-element-container {
  background-color: #eeeeee;
}

</style>