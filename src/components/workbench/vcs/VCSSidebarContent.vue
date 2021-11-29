<template>
  <div class="value-creation-strategy pb-16 mb-16">

    <v-list dense expand>
      <v-list-item-group v-model="list_selection">
        <v-list-item
            v-for="(vcs, index) in vcs_list"
            @click="vcs_selected(vcs.id)"
            :class="'vcs-with-id-' + vcs.id"
        >

          <v-list-item-content>
            <v-card :loading="loading_list_items[index]"
                    loader-height="30"
                    style="background-color: transparent"
                    flat>
              <v-list-item-title>{{ vcs.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ vcs.year_from }}-{{ vcs.year_to }} | {{ vcs.description }}</v-list-item-subtitle>
            </v-card>
          </v-list-item-content>

          <v-list-item-action>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="vcs_selected(vcs.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-open-in-app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Open</v-list-item-title>
                </v-list-item>

                <v-list-item @click="duplicate_vcs(vcs)">
                  <v-list-item-icon>
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item>

                <v-list-item @click="edit_vcs(vcs)">
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>

                <v-list-item @click="delete_vcs(vcs.id)">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>

        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            @click="new_vcs_form = true"
            fab
            class="new-vcs-btn"
            color="primary"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Create new VCS</span>
    </v-tooltip>

    <NewVCSForm
        :show="new_vcs_form"
        @close="new_vcs_form = false"
        @vcs-created="on_vcs_created"
    ></NewVCSForm>

    <EditVCSForm
        :show="edit_vcs_form"
        :vcs="vcs_to_edit"
        @close="edit_vcs_form = false"
        @vcs-edited="on_vcs_edited"
    ></EditVCSForm>

    <ConfirmDialog
        ref="confirm_dialog"
        title="Delete VCS?"
        message="Are you sure you want to delete this VCS?"
        btn_confirm="Delete"
        btn_confirm_clr="error"
        btn_reject="Cancel"
    ></ConfirmDialog>

  </div>
</template>


<script>
import NewVCSForm from '@/components/workbench/vcs/forms/NewVCSForm';
import CVSVCSService from '@/services/cvs-vcs.service';
import ConfirmDialog from '@/components/utils/ConfirmDialog';
import EditVCSForm from '@/components/workbench/vcs/forms/EditVCSForm';
import Notification from '@/models/utils/Notification';

export default {
  name: 'VCSSidebarContent',

  props: [
    'project',
    'vcs_list',
  ],

  components: {
    EditVCSForm,
    ConfirmDialog,
    NewVCSForm,
  },

  data() {
    return {
      list_selection: null,
      new_vcs_form: false,
      edit_vcs_form: false,
      vcs_to_edit: {},
      loading_list_items: [],
    };
  },

  methods: {
    on_vcs_created(vcs) {
      this.vcs_list.push(vcs);
    },
    on_vcs_edited(vcs) {
      const index = this.vcs_list.findIndex(obj => obj.id === vcs.id);
      this.vcs_list[index] = vcs;
    },
    vcs_selected(id) {
      this.$emit('vcs-selected', id);
    },
    duplicate_vcs(vcs) {
      const index = this.vcs_list.findIndex(obj => obj.id === vcs.id);
      this.loading_list_items[index] = true;
      const project_id = this.$route.params.project_id;
      CVSVCSService.create_vcs(project_id, vcs)
          .catch(error => {
            console.error(error);
            Notification.emit_standard_error_message();
            this.loading_list_items.fill(false);
          })
          .then(vcs => {
            this.loading_list_items.fill(false);
            this.vcs_list.push(vcs);
            new Notification('success', `VCS "${vcs.name}" duplicated.`).push();
          });
    },
    edit_vcs(vcs) {
      this.vcs_to_edit = vcs;
      this.edit_vcs_form = true;
    },
    delete_vcs(id) {
      const index = this.vcs_list.findIndex(obj => obj.id === id);
      this.loading_list_items[index] = true;
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          CVSVCSService.delete_vcs(this.project.id, id)
              .catch(error => {
                console.error(error);
                Notification.emit_standard_error_message();
                this.loading_list_items[index] = true;
              })
              .then(data => {
                this.loading_list_items[index] = true;
                if (data === true) {
                  $('.vcs-with-id-' + id).fadeOut(500, () => {
                    const i = this.vcs_list.findIndex(x => x.id === id);
                    this.vcs_list.splice(i, 1);
                  });
                }
              });
        }
      });
    },
  },

  watch: {
    vcs_list() {
      if (!!this.value_drivers) {
        this.loading_list_items = new Array(this.vcs_list.length).fill(false);
      }
    },
  },

};
</script>


<style scoped>

.new-vcs-btn {
  position: fixed;
  right: 2em;
  bottom: 2em;
}

</style>
