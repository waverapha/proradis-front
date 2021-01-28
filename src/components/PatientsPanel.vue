<template>
  <div class="panel aside-list-panel">
    <p class="panel-heading">Pacientes</p>

    <b-loading
    v-model="loading.patientsList"
    :is-full-page="false"></b-loading>

    <aside-panel-list
    v-if="!loading.patientsList"
    :list="patients.data"
    button-text="Nova Consulta"
    @list-item-click="handleStoreMedicalAppointment($event)">
      <template v-slot="slotProps">
        <span class="patient-name is-size-7">{{ slotProps.item.name }}</span>
      </template>
    </aside-panel-list>

    <div class="panel-block aside-list-panel-footer">
      <b-button
      icon-left="plus"
      @click="isStorePatientModalActive = !isStorePatientModalActive">Novo paciente</b-button>
    </div>

    <aside-panel-list-pagination
    :pagination="patients.meta.pagination"
    @change="fetchPatients({page: $event})"></aside-panel-list-pagination>
  </div>
</template>

<script>
import AsidePanelList from '@/components/AsidePanelList';
import AsidePanelListPagination from '@/components/AsidePanelListPagination.vue';

import { mapActions, mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  components: {
    AsidePanelList,
    AsidePanelListPagination
  },

  created(){
    this.fetchPatients({
      page: 1
    });
  },

  methods: {
    ...mapActions([
      'fetchPatients',
      'handleStoreMedicalAppointment'
    ])
  },

  computed: {
    ...mapState([
      'patients',
      'loading',
    ]),

    ...mapFields([
      'isStorePatientModalActive'
    ])
      
  },
}
</script>