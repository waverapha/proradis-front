import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patients: [],
    medicalAppointments: [],
    isStorePatientModalActive: false,
    selectedMedicalAppointment: {
      id: null,
      patient: {
        id: null,
        name: null
      },
      record: '',
    },
    loading: {
      patientsList: false,
      medicalAppointmentsList: false,
      storePatientButton: false,
      saveMedicalAppointment: false,
    },
  },
  
  mutations: {
    SET_LOADING_STATE(state, { type, value }){
      state.loading[type] = value;
    },

    SET_PATIENTS(state, patients){
      state.patients = patients;
    },

    SET_MEDICAL_APPOINTMENTS(state, medicalAppointments){
      state.medicalAppointments = medicalAppointments;
    },

    SET_SELECTED_MEDICAL_APPOINTMENT(state, medicalAppointment){
      state.selectedMedicalAppointment.id = medicalAppointment.id;
      state.selectedMedicalAppointment.patient.id = medicalAppointment.patient_id;
      state.selectedMedicalAppointment.patient.name = medicalAppointment.name;
      state.selectedMedicalAppointment.record = medicalAppointment.record;
    },

    updateField,
  },

  actions: {
    handleStoreMedicalAppointment({ commit }, patient){
      commit('SET_SELECTED_MEDICAL_APPOINTMENT', {
        id: null,
        patient_id: patient.id,
        record: '',
        name: patient.name,
      })
    },

    handleUpdateMedicalAppointment({ dispatch }, medicalAppointment){
      dispatch('fetchPacientMedicalAppointment', medicalAppointment);
    },

    fetchPatients({ commit }){
      commit('SET_LOADING_STATE', {
        type: 'patientsList',
        value: true
      });

      fetch('http://localhost:9000/patients')
      .then(response => response.json())
      .then(patients => {
        commit('SET_PATIENTS', patients.data);
      })
      .finally(() => {
        commit('SET_LOADING_STATE', {
          type: 'patientsList',
          value: false
        });
      })
    },

    fetchMedicalAppointments({ commit }){
      commit('SET_LOADING_STATE', {
        type: 'medicalAppointmentsList',
        value: true
      });

      fetch('http://localhost:9000/medical-appointments?include=patient')
      .then(response => response.json())
      .then(medicalAppointments => {
        commit('SET_MEDICAL_APPOINTMENTS', medicalAppointments.data);
      })
      .finally(() => {
        commit('SET_LOADING_STATE', {
          type: 'medicalAppointmentsList',
          value: false
        });
      })
    },

    fetchPacientMedicalAppointment({ commit }, {id, patient_id, patient}){
      fetch(`http://localhost:9000/patients/${patient_id}/medical-appointments/${id}`)
      .then(response => response.json())
      .then(medicalAppointment => {
        const {record} = medicalAppointment.data;

        commit('SET_SELECTED_MEDICAL_APPOINTMENT', {
          id,
          patient_id,
          record,
          name: patient.data.name
        });
      })
      .catch(error => {
        console.log(error);
      });
    },

    storeMedicalAppointment({ commit, dispatch, state }){
      commit('SET_LOADING_STATE', {
        type: 'saveMedicalAppointment',
        value: true
      });
      
      const headers = new Headers;
      headers.append('Content-type', 'application/json');

      const medicalAppointment = state.selectedMedicalAppointment;

      const data = {
        record: medicalAppointment.record
      };

      fetch(`http://localhost:9000/patients/${medicalAppointment.patient.id}/medical-appointments`, {
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
      })
      .finally(() => {
        dispatch('clearMedicalAppointment');
        commit('SET_LOADING_STATE', {
          type: 'saveMedicalAppointment',
          value: false
        });
      });
    },

    updateMedicalAppointment({ commit, dispatch, state }){
      commit('SET_LOADING_STATE', {
        type: 'saveMedicalAppointment',
        value: true
      });

      const headers = new Headers;
      headers.append('Content-type', 'application/json');

      const medicalAppointment = state.selectedMedicalAppointment;

      const data = {
        record: medicalAppointment.record
      };

      fetch(`http://localhost:9000/patients/${medicalAppointment.patient.id}/medical-appointments/${medicalAppointment.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers
      })
      .then(response => response.json())
      .then(patient => {
        console.log(patient);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch('clearMedicalAppointment');
        commit('SET_LOADING_STATE', {
          type: 'saveMedicalAppointment',
          value: false
        });
      });
    },

    clearMedicalAppointment({ commit }){
      commit('SET_SELECTED_MEDICAL_APPOINTMENT', {
        id: null,
        patient_id: null,
        record: '',
        name: null,
      })
    }
  },

  getters: {

    operation(state){
      const {id} = state.selectedMedicalAppointment;

      return ( id !== null ) ? 'update' : 'store';
    },

    mainTitle(state){
      const name = state.selectedMedicalAppointment.patient.name;

      return ( name !== null ) ? `Paciente: ${name}` : 'Selecione um paciente ou prontuário';
    },

    allowsMedicalAppointmentOperation(state, getters){
      return getters.hasRecord && getters.hasSelectedPatient;
    },

    hasRecord(state){
      return state.selectedMedicalAppointment.record.length > 0;
    },

    hasSelectedPatient(state){
      const {id} = state.selectedMedicalAppointment.patient;

      return id !== null;
    },

    getField,
  }
})
