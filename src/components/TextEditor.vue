<template>

  <vue-editor
  v-model="medicalAppointment.record"
  :editorToolbar="customToolbar"
  placeholder="Digite aqui o prontuário do paciente"></vue-editor>

</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor
  },

  props: {
    medicalAppointment: {
      type: Object,
      required: true
    }
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
}
</script>