<template>
  <div class="panel aside-list-panel">
    <p class="panel-heading">Prontuários</p>

    <b-loading
    v-model="loading.medicalAppointmentsList"
    :is-full-page="false"></b-loading>

    <aside-panel-list
    v-if="!loading.medicalAppointmentsList"
    :list="medicalAppointments.data"
    button-text="Ver Consulta"
    @list-item-click="handleUpdateMedicalAppointment($event)">
      <template v-slot="slotProps">
        <span class="patient-name is-size-7">{{ slotProps.item.patient.data.name }}</span>
      </template>
    </aside-panel-list>

    <aside-panel-list-pagination
    :pagination="medicalAppointments.meta.pagination"
    @change="fetchMedicalAppointments({
      page: $event,
      include: 'patient'
    })"></aside-panel-list-pagination>
  </div>
</template>

<script>
import AsidePanelList from '@/components/AsidePanelList';

import { mapActions, mapState } from 'vuex';
import AsidePanelListPagination from '@/components/AsidePanelListPagination.vue';

export default {
  components: {
    AsidePanelList,
    AsidePanelListPagination
  },

  created(){
    this.fetchMedicalAppointments({
      page: 1,
      include: 'patient'
    });
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