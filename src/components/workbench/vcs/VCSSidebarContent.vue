<template>
  <div class="value-creation-strategy pb-16 mb-16">

    <div v-if="!!vcs_list === false" class="loading-anim-container">
      <LoadingAnimaiton></LoadingAnimaiton>
    </div>

    <v-list v-else dense expand>
      <v-list-item-group v-model="list_selection">
        <v-list-item v-for="vcs in vcs_list"
                     @click="vcs_selected(vcs.id)"
                     :class="'vcs-list-item vcs-with-id-' + vcs.id">

          <v-list-item-content>
            <v-card :loading="vcs.loading === true"
                    loader-height="30"
                    style="background-color: transparent"
                    flat>
              <v-list-item-title>{{ vcs.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ vcs.year_from }}-{{ vcs.year_to }} <span v-if="!!vcs.description">| {{ vcs.description }}</span>
              </v-list-item-subtitle>
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

    <!-- CREATE NEW BUTTON -->
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            @click="show_new_vcs_form = true"
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
        :show="show_new_vcs_form"
        @close="show_new_vcs_form = false"
        @vcs-created="on_vcs_created"
    ></NewVCSForm>


    <EditVCSForm
        :show="show_edit_vcs_form"
        :vcs="vcs_to_edit"
        @close="show_edit_vcs_form = false"
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
import ConfirmDialog from '@/components/utils/ConfirmDialog';
import EditVCSForm from '@/components/workbench/vcs/forms/EditVCSForm';
import LoadingAnimaiton from '@/components/utils/LoadingAnimaiton';
import NewVCSForm from '@/components/workbench/vcs/forms/NewVCSForm';

import Notification from '@/models/utils/Notification';
import VCS from '@/models/VCS';

import CVSVCSService from '@/services/cvs-vcs.service';

export default {
  name: 'VCSSidebarContent',

  props: [],

  components: {
    LoadingAnimaiton,
    EditVCSForm,
    ConfirmDialog,
    NewVCSForm,
  },

  data() {
    return {
      list_selection: null,
      show_new_vcs_form: false,
      show_edit_vcs_form: false,
      vcs_to_edit: {},
    };
  },

  methods: {
    vcs_selected(id) {
      const vcs = this.vcs_list.find(item => item.id === id);
      if (!!vcs) VCS.set_active(vcs);
    },
    on_vcs_created(vcs) {
      VCS.add_to_list(vcs);
    },
    on_vcs_edited(vcs) {
      const index = this.vcs_list.findIndex(item => item.id === vcs.id);
      this.vcs_list[index] = vcs;
    },
    duplicate_vcs(vcs) {
      vcs.loading = true;
      const duplicate = JSON.parse(JSON.stringify(vcs));
      duplicate.name += ' COPY';
      CVSVCSService.create_vcs(this.project.id, duplicate)
          .catch(error => {
            console.error(error);
            Notification.emit_standard_error_message();
            vcs.loading = false;
          })
          .then(new_vcs => {
            VCS.add_to_list(new_vcs);
            new Notification(
                'success',
                `VCS "${vcs.name}" duplicated into "${new_vcs.name}".`,
                3000,
            ).push();
            vcs.loading = false;
          });
      // todo: copy table as well
    },
    edit_vcs(vcs) {
      this.vcs_to_edit = vcs;
      this.show_edit_vcs_form = true;
    },
    delete_vcs(id) {
      const vcs = this.vcs_list.find(item => item.id === id);
      vcs.loading = true;
      this.$refs.confirm_dialog.open().then(result => {
        if (result === 'confirm') {
          CVSVCSService.delete_vcs(this.project.id, id)
              .catch(error => {
                vcs.loading = false;
                console.error(error);
                Notification.emit_standard_error_message();
              })
              .then(data => {
                vcs.loading = false;
                if (data === true) {
                  const new_vcs_list = JSON.parse(JSON.stringify(this.vcs_list)).filter(item => item.id !== id);
                  $('.vcs-with-id-' + id).fadeOut(500, () => {
                    VCS.update_list(new_vcs_list);
                    $('.vcs-list-item').show(); // has to be used otherwise some elements are hidden
                  });
                }
              });
        } else {
          vcs.loading = false;
        }
      });
    },
  },

  computed: {
    project() {
      return this.$store.state.Project.active_project;
    },
    vcs_list() {
      return this.$store.state.VCS.vcs_list;
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

.loading-anim-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
