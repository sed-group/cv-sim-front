<template>

  <div class="menubar">

    <v-menu offset-y v-for="menu_item in menu_items" v-if="menu_item.type !== 'new-tab'">

      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            outlined
            v-bind="attrs"
            v-on="on"
            small
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

    <v-btn
        v-else
        target="_blank"
        href="https://www.google.com/"
        color="primary"
        outlined
        small
    >
      {{ menu_item.title }}
       <v-icon right small>mdi-open-in-new</v-icon>
    </v-btn>

  </div>

</template>


<script>

export default {
  name: "Menubar",
  props: ['menu_items'],
}

</script>


<style scoped>

.no-uppercase {
  text-transform: none;
}

</style>