<template>
  <div id="app">
    <main>

      <div class="patient-panels">

        <div class="panel patient-panel">
          <p class="panel-heading">Pacientes</p>

          <ul class="patient-panel-list">
            <li
            class="panel-block patient-panel-list-item"
            v-for="patient in patients"
            :key="patient.id">
              <span class="patient-name is-size-7">{{ patient.name }}</span>
              <b-button size="is-small">Nova Consulta</b-button>
            </li>
          </ul>

          <div class="panel-block patient-panel-footer">
            <b-button
            icon-left="plus"
            @click="storePatient()">Novo paciente</b-button>
          </div>
        </div>

        <div class="panel patient-panel">
          <p class="panel-heading">Prontuários</p>

          <ul class="patient-panel-list">
            <li
            class="panel-block patient-panel-list-item"
            v-for="medicalAppointment in medicalAppointments"
            :key="medicalAppointment.id">
              <span class="patient-name is-size-7">{{ medicalAppointment.patient.data.name }}</span>
              <b-button
              size="is-small"
              @click="selectMedicalAppointment(medicalAppointment)">Ver Consulta</b-button>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-editor-container">
        <h3 class="is-size-4">{{ textEditorTitle }}</h3>

        <text-editor
        :medicalAppointment="selectedMedicalAppointment"
        ></text-editor>

        <button class="button"
        @click="updateMedicalAppointment()"
        :loading="!isLoadingUpdate"
        :disabled="!hasSelectedMedicalAppointment || !hasSelectedPatient">Salvar consulta</button>
      </div>

    </main>
  </div>
</template>

<script>

import TextEditor from './components/TextEditor.vue';

export default {
  name: 'App',

  components: {
    TextEditor
  },

  created(){
    TextEditor
    this.fetchPatients();
    this.fetchMedicalAppointments();
  },

  data(){
    return {
      isLoadingUpdate: false,
      patients: [],
      medicalAppointments: [],
      selectedPatient: {
        name: '',
      },
      selectedMedicalAppointment: {
        id: null,
        patient_id: null,
        record: '',
        created_at: null,
        updated_at: null,
        deleted_at: null
      }
    }
  },

  methods: {
    fetchPatients(){
      fetch('http://localhost:9000/patients')
      .then(response => response.json())
      .then(patients => {
        this.patients = patients.data;
      })
    },

    fetchMedicalAppointments(){
      fetch('http://localhost:9000/medical-appointments?include=patient')
      .then(response => response.json())
      .then(medicalAppointments => {
        this.medicalAppointments = medicalAppointments.data;
      })
    },

    fetchPacientMedicalAppointment(id, patient){
      fetch(`http://localhost:9000/patients/${patient}/medical-appointments/${id}`)
      .then(response => response.json())
      .then(medicalAppointment => {
        this.selectedMedicalAppointment = medicalAppointment.data;
      })
      .catch(error => {
        console.log(error);
      });
    },

    storePatient(){
      const data = {
        name: 'Bla',
        document: '23866788061',
        gender: 'M',
        birthdate: '02/07/1995'
      };

      const headers = new Headers;
      headers.append('Content-type', 'application/json');

      fetch('http://localhost:9000/patients', {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
      .then(response => response.json())
      .then(patient => {
        console.log(patient);
      })
      .catch(error => {
        console.log(error);
      });
    },

    updateMedicalAppointment(){
      const headers = new Headers;
      headers.append('Content-type', 'application/json');

      const medicalAppointment = this.selectedMedicalAppointment;

      const data = {
        record: medicalAppointment.record
      };

      this.isLoadingUpdate = true;

      fetch(`http://localhost:9000/patients/${medicalAppointment.patient_id}/medical-appointments/${medicalAppointment.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers
      })
      .then(response => response.json())
      .then(patient => {
        console.log(patient);
        this.isLoadingUpdate = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoadingUpdate = false;
      });
    },

    selectMedicalAppointment(medicalAppointment){
      this.selectedPatient.name = medicalAppointment.patient.data.name;
      this.fetchPacientMedicalAppointment(medicalAppointment.id, medicalAppointment.patient.data.id);
    }
  },

  computed: {
    hasSelectedMedicalAppointment(){
      return this.selectedMedicalAppointment.id !== null;
    },

    hasSelectedPatient(){
      return this.selectedPatient.name !== null;
    },

    textEditorTitle(){
      return ( this.selectedPatient.name ) ? `Paciente: ${this.selectedPatient.name}` : 'Selecione um paciente ou prontuário';
    }
  }
}
</script>
