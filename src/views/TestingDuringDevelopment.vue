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
      <v-btn @click="do_bpmn()">Do BPMN</v-btn>
      <div class="modeler" id="canvas"></div>

    </div>

  </div>

</template>


<script>
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';

import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import BpmnModdle from 'bpmn-moddle';
import Modeler from 'bpmn-js/lib/Modeler';
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

    async do_bpmn() {

      const bpmn_xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1tp66sz" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="9.0.0-alpha.2">\n' +
          '  <bpmn:process id="Process_0c4v9q7" isExecutable="false">\n' +
          '    <bpmn:startEvent id="Event_02fca1i">\n' +
          '      <bpmn:outgoing>Flow_0w50z9g</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <bpmn:task id="Activity_135lfgm">\n' +
          '      <bpmn:incoming>Flow_0w50z9g</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_0p5ho4o</bpmn:outgoing>\n' +
          '    </bpmn:task>\n' +
          '    <bpmn:sequenceFlow id="Flow_0w50z9g" sourceRef="Event_02fca1i" targetRef="Activity_135lfgm" />\n' +
          '    <bpmn:task id="Activity_0xu3ui7">\n' +
          '      <bpmn:incoming>Flow_0p5ho4o</bpmn:incoming>\n' +
          '      <bpmn:outgoing>Flow_11qkbfx</bpmn:outgoing>\n' +
          '    </bpmn:task>\n' +
          '    <bpmn:sequenceFlow id="Flow_0p5ho4o" sourceRef="Activity_135lfgm" targetRef="Activity_0xu3ui7" />\n' +
          '    <bpmn:endEvent id="Event_0mcoe3b">\n' +
          '      <bpmn:incoming>Flow_11qkbfx</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '    <bpmn:sequenceFlow id="Flow_11qkbfx" sourceRef="Activity_0xu3ui7" targetRef="Event_0mcoe3b" />\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0c4v9q7">\n' +
          '      <bpmndi:BPMNEdge id="Flow_0w50z9g_di" bpmnElement="Flow_0w50z9g">\n' +
          '        <di:waypoint x="188" y="120" />\n' +
          '        <di:waypoint x="240" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_0p5ho4o_di" bpmnElement="Flow_0p5ho4o">\n' +
          '        <di:waypoint x="340" y="120" />\n' +
          '        <di:waypoint x="400" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="Flow_11qkbfx_di" bpmnElement="Flow_11qkbfx">\n' +
          '        <di:waypoint x="500" y="120" />\n' +
          '        <di:waypoint x="562" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNShape id="Event_02fca1i_di" bpmnElement="Event_02fca1i">\n' +
          '        <dc:Bounds x="152" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_135lfgm_di" bpmnElement="Activity_135lfgm">\n' +
          '        <dc:Bounds x="240" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Activity_0xu3ui7_di" bpmnElement="Activity_0xu3ui7">\n' +
          '        <dc:Bounds x="400" y="80" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Event_0mcoe3b_di" bpmnElement="Event_0mcoe3b">\n' +
          '        <dc:Bounds x="562" y="102" width="36" height="36" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>';
      console.log(bpmn_xml)

      // create a modeler
      const modeler = new NavigatedViewer({
        container: '#canvas'
      });


      // import diagram
      try {
        console.log('Alles gut!')
        await modeler.importXML(bpmn_xml);
        modeler.get('canvas').zoom('fit-viewport')
      } catch (err) {
        console.log('Error occurred!')
        console.log(error)
      }

    }

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
    this.do_bpmn()
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