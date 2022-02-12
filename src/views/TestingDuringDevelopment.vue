<template>

  <div>
    <!--
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
    -->

    <div>
      <v-btn @click="loading = !loading">Toggle loading</v-btn>
      <div id="canvas"></div>

    </div>

  </div>

</template>


<script>
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import BpmnModdle from 'bpmn-moddle';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import CliModule from 'bpmn-js-cli';

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

  async mounted() {


    // const viewer = NavigatedViewer({
    //   container: '#canvas',
    //   additionalModules: [
    //     BpmnModdle,
    //   ],
    //   cli: {
    //     bindTo: 'cli',
    //   },
    // });
    // const diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
    // const bpmnXML = await $.get(diagramUrl, (data) => {
    //   return data;
    // });
    // viewer.importXML(bpmnXML).then(function (result) {
    //   const {warnings} = result;
    //   console.log('success !', warnings);
    //   viewer.get('canvas').zoom('fit-viewport');
    // }).catch(function (err) {
    //   const {warnings, message} = err;
    //   console.log('something went wrong:', warnings, message);
    // });

    const moddle = new BpmnModdle();

    const xmlStr =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'id="empty-definitions" ' +
        'targetNamespace="http://bpmn.io/schema/bpmn">' +
        '</bpmn2:definitions>';


    const {
      rootElement: definitions,
    } = await moddle.fromXML(xmlStr);

    // update id attribute
    definitions.set('id', 'new_id');

    // add a root element
    const bpmnProcess = moddle.create('bpmn:Process', {id: 'MyProcess_1'});
    definitions.get('rootElements').push(bpmnProcess);

    // xmlStrUpdated contains new id and the added process
    const {
      xml: xmlStrUpdated,
    } = await moddle.toXML(definitions);

    const modeler = new BpmnModeler({
      container: '#canvas',
    });

    // const bpmn_xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    //     '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1pl9twe" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.0-alpha.2">\n' +
    //     '  <bpmn:process id="Process_1fxbwpj" isExecutable="false" />\n' +
    //     '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    //     '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1fxbwpj" />\n' +
    //     '  </bpmndi:BPMNDiagram>\n' +
    //     '</bpmn:definitions>';

    modeler.importXML(xmlStrUpdated)
        .then(({warnings}) => {
          console.log('success !', warnings);
        })
        .catch(err => {
          const {warnings, message} = err;
          console.log('something went wrong:', warnings, message);
        });

  },
};


</script>


<style scoped>

#canvas {
  min-width: 500px;
  min-height: 500px;
  outline: 1px solid red;
  margin: 1em;
}

.hidden-ghost {
  visibility: hidden;
}

</style>