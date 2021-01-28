<template>
  <div class="panel aside-list-panel">
    <p class="panel-heading">Pacientes</p>

    <b-loading
    v-model="loading.patientsList"
    :is-full-page="false"></b-loading>

    <!-- <ul class="aside-list-panel-list" v-if="!loading.patientsList">
      <li
      class="panel-block aside-list-panel-list-item"
      v-for="patient in patients"
      :key="patient.id">
        <span class="patient-name is-size-7">{{ patient.name }}</span>
        <b-button size="is-small" @click="handleStoreMedicalAppointment(patient)">Nova Consulta</b-button>
      </li>
    </ul> -->

    <aside-panel-list
    v-if="!loading.patientsList"
    :list="patients"
    button-text="Nova Consulta"
    @list-item-click="handleStoreMedicalAppointment($event)">
      <template v-slot="slotProps">
        <span class="patient-name is-size-7">{{ slotProps.item.name }}</span>
      </template>
    </aside-panel-list>

    <div class="panel-block aside-list-panel-footer">
      <b-button
      icon-left="plus"
      @click="isStorePatientModalActive = true">Novo paciente</b-button>
    </div>
  </div>
</template>

<script>
import AsidePanelList from '@/components/AsidePanelList';

import { mapActions, mapState } from 'vuex';

export default {
  components: {
    AsidePanelList
  },

  created(){
    this.fetchPatients();
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
      'isStorePatientModalActive'
    ])
  },
}
</script>