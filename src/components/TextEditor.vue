<template>

  <vue-editor
  v-model="selectedMedicalAppointment.record"
  :editorToolbar="customToolbar"
  placeholder="Digite aqui o prontuário do paciente"></vue-editor>

</template>

<script>
import { VueEditor } from 'vue2-editor';
import { mapState } from 'vuex';

export default {
  components: {
    VueEditor
  },

  data(){
    return {
      customToolbar: [
          [
            { size: [ 'small', false, 'large', 'huge' ]}
          ],
          [
            "bold",
            "italic",
            "underline"
          ],
          [
            { list: "ordered" },
            { list: "bullet" }
          ]
        ]
    }
  },

  computed: {
    ...mapState([
      'selectedMedicalAppointment'
    ])
  }
}
</script>