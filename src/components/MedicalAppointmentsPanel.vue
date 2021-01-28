<template>
  <div class="panel aside-list-panel">
    <p class="panel-heading">Prontuários</p>

    <b-loading
    v-model="loading.medicalAppointmentsList"
    :is-full-page="false"></b-loading>

    <aside-panel-list
    v-if="!loading.medicalAppointmentsList"
    :list="medicalAppointments"
    button-text="Ver Consulta"
    @list-item-click="handleUpdateMedicalAppointment($event)">
      <template v-slot="slotProps">
        <span class="patient-name is-size-7">{{ slotProps.item.patient.data.name }}</span>
      </template>
    </aside-panel-list>
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
    this.fetchMedicalAppointments();
  },

  methods: {
    ...mapActions([
      'fetchMedicalAppointments',
      'handleUpdateMedicalAppointment'
    ])
  },

  computed: {
    ...mapState([
      'medicalAppointments',
      'loading'
    ])
  }
}
</script>