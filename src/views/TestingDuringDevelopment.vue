<template>

  <div>
    <v-navigation-drawer app permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <div v-if="loading" class="fill-height d-flex justify-center align-center">
        <LoadingAnimaiton></LoadingAnimaiton>
      </div>

      <v-list v-else dense nav>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <div>
      <v-btn @click="loading = !loading">Toggle loading</v-btn>


      <div v-for="desserts in desserts_list">
        <v-data-table
            :headers="headers"
            :items="desserts"
            v-sortable-data-table
            @sorted="saveOrder"
            item-key="name"
        ></v-data-table>
      </div>

      <div>
        <v-list two-line v-for="(persons, index) in person_lists">
          <draggable v-model="person_lists[index]" animation="200" ghost-class="hidden-ghost" @end="hej">
            <v-list-item v-for="person in persons" link>
              <v-list-item-content>
                <v-list-item-title>{{ person.name }}</v-list-item-title>
                <v-list-item-subtitle>No. {{ person.id }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </draggable>
        </v-list>
      </div>

    </div>

  </div>

</template>


<script>
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

export default {
  name: 'TestingDuringDevelopment',

  components: {
    LoadingAnimaiton,
    draggable,
  },

  data() {
    return {
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard'},
        {title: 'Photos', icon: 'mdi-image'},
        {title: 'About', icon: 'mdi-help-box'},
      ],
      loading: true,

      options: {
        animation: 150,
      },

      person_lists: [
        [
          {id: 1, name: 'Oskar'},
          {id: 2, name: 'Malin'},
          {id: 3, name: 'Adam'},
          {id: 4, name: 'Stefan'},
        ],
        [
          {id: 1, name: 'A'},
          {id: 2, name: 'B'},
          {id: 3, name: 'C'},
          {id: 4, name: 'D'},
        ],
      ],

      headers: [
        {
          text: 'Dessert',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ],
      desserts_list: [
        [
          {
            name: 'Frozen Yogurt',
          },
          {
            name: 'Ice cream sandwich',
          },
          {
            name: 'Eclair',
          },
          {
            name: 'Cupcake',
          },
          {
            name: 'Gingerbread',
          },
        ],
        [
          {
            name: 'Oskar',
          },
          {
            name: 'Malin',
          },
          {
            name: 'Hej',
          },
          {
            name: 'One',
          },
          {
            name: 'Four',
          },
        ],
      ],
    };
  },
  methods: {
    saveOrder(event) {
      const movedItem = this.desserts.splice(event.oldIndex, 1)[0];
      this.desserts.splice(event.newIndex, 0, movedItem);
    },
    hej() {
      for (let i = 0; i < this.person_lists.length; i++) {
        console.log('List ' + (i + 1));
        for (const person of this.person_lists[i]) {
          console.log(`- ${person.name}`);
        }
      }
    },
  },
  directives: {
    sortableDataTable: {
      bind(el, binding, vnode) {
        const options = {
          animation: 150,
          onUpdate: function (event) {
            vnode.child.$emit('sorted', event);
          },
        };
        Sortable.create(el.getElementsByTagName('tbody')[0], options);
      },
    },
  },
};


</script>


<style scoped>

.hidden-ghost {
  visibility: hidden;
}

</style>