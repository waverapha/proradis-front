<template>
  <div id="app">
    <main>

      <div class="patient-panels">

        <div class="panel patient-panel">
          <p class="panel-heading">Novos</p>

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
            @click="addPatient()">Novo paciente</b-button>
          </div>
        </div>

        <div class="panel patient-panel">
          <p class="panel-heading">Atendidos</p>

          <ul class="patient-panel-list">
            <li
            class="panel-block patient-panel-list-item"
            v-for="medicalAppointment in medicalAppointments"
            :key="medicalAppointment.id">
              <span class="patient-name is-size-7">{{ medicalAppointment.patient.data.name }}</span>
              <b-button
              size="is-small"
              @click="fetchPacientMedicalAppointment(medicalAppointment.id, medicalAppointment.patient.data.id)">Ver Consulta</b-button>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-editor-container">
        <b-field label="Message">
            <b-input
            maxlength="1000"
            type="textarea"
            v-model="selectedMedicalAppointment.record"></b-input>
        </b-field>
      </div>

    </main>
  </div>
</template>

<script>

export default {
  name: 'App',

  created(){
    this.fetchPatients();
    this.fetchMedicalAppointments();
  },

  data(){
    return {
      patients: [],
      medicalAppointments: [],
      selectedMedicalAppointment: {
        id: null,
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

    addPatient(){
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
        console.log('oiusa');
        console.log(error);
      });
    }
  }
}
</script>
