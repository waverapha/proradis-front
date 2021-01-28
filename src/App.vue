<template>
  <div id="app">
    <aside class="aside-list-panels">

      <patients-panel></patients-panel>

      <medical-appointments-panel></medical-appointments-panel>

    </aside>

    <base-main></base-main>

    <b-modal
      v-model="isStorePatientModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Modal para adição de paciente"
      aria-modal
      scroll="keep">
      <template v-slot="props">
          <store-patient-modal @close="props.close"></store-patient-modal>
      </template>
    </b-modal>
  </div>
</template>

<script>

import StorePatientModal from '@/components/StorePatientModal.vue';
import BaseMain from '@/components/BaseMain.vue';
import MedicalAppointmentsPanel from '@/components/MedicalAppointmentsPanel.vue';
import PatientsPanel from '@/components/PatientsPanel.vue';

import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    BaseMain,
    StorePatientModal,
    MedicalAppointmentsPanel,
    PatientsPanel,
  },

  computed: {
    ...mapState([
      'isStorePatientModalActive'
    ])
  }
}
</script>
