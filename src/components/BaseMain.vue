<template>
  <main>
    <h3 class="is-size-4">{{ mainTitle }} <span v-if="hasMedicalRecord">Prontuário: {{ medicalRecord }}</span></h3>

    <text-editor></text-editor>

    <b-button
    @click="executeOperation()"
    :loading="loading.saveMedicalAppointment"
    :disabled="!allowsMedicalAppointmentOperation">Salvar consulta</b-button>
  </main>
</template>

<script>
import TextEditor from '@/components/TextEditor.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  components: {
    TextEditor
  },

  methods: {
    ...mapActions([
      'storeMedicalAppointment',
      'updateMedicalAppointment'
    ]),

    executeOperation(){
      const operations = {
        update: this.updateMedicalAppointment,
        store: this.storeMedicalAppointment
      }

      return operations[this.operation]();
    }
  },

  computed: {
    ...mapState([
      'loading',
    ]),

    ...mapGetters([
      'operation',
      'mainTitle',
      'allowsMedicalAppointmentOperation'
    ])
  }
}
</script>

<style>

</style>