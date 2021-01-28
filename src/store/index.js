import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields';

import patientRespository from '@/repository/patient';
import medicalAppointmentRespository from '@/repository/medical-appointment';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patients: {
      data: [],
      meta: {
        pagination: {
          count: 0,
          current_page: 1,
          links: {
            prev: null,
            next: null,
          },
          per_page: 25,
          total: 0,
          total_pages: 0,
        }
      }
    },
    medicalAppointments: {
      data: [],
      meta: {
        pagination: {
          count: 0,
          current_page: 1,
          links: {
            prev: null,
            next: null,
          },
          per_page: 25,
          total: 0,
          total_pages: 0,
        }
      }
    },
    medicalAppointmentsMeta: [],
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

    SET_PATIENTS(state, data){
      state.patients.data = data.data;
      state.patients.meta.pagination = data.meta.pagination;
    },

    SET_MEDICAL_APPOINTMENTS(state, data){
      state.medicalAppointments.data = data.data;
      state.medicalAppointments.meta.pagination = data.meta.pagination;
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

    async fetchPatients({ commit }, {page}){
      commit('SET_LOADING_STATE', {
        type: 'patientsList',
        value: true
      });

      try{
        const response = await patientRespository.all(page);

        commit('SET_PATIENTS', response.data);
      }
      catch(e){
        console.log(e);
      }
      finally{
        commit('SET_LOADING_STATE', {
          type: 'patientsList',
          value: false
        });
      }
    },

    async fetchMedicalAppointments({ commit }, {page, include}){
      commit('SET_LOADING_STATE', {
        type: 'medicalAppointmentsList',
        value: true
      });

      try{
        const response = await medicalAppointmentRespository.all(page, include);

        commit('SET_MEDICAL_APPOINTMENTS', response.data);
      }
      catch(e){
        console.log(e);
      }
      finally{
        commit('SET_LOADING_STATE', {
          type: 'medicalAppointmentsList',
          value: false
        });
      }
    },

    async fetchPacientMedicalAppointment({ commit }, medicalAppointment){
      
      try{
        const {data} = await patientRespository.medicalAppointments(medicalAppointment.patient_id, medicalAppointment.id);

        const {id, patient_id, record} = data.data;

        commit('SET_SELECTED_MEDICAL_APPOINTMENT', {
          id,
          patient_id,
          record,
          name: medicalAppointment.patient.data.name
        });
      } catch(e){
        console.log(e);
      }
    },

    async storeMedicalAppointment({ commit, dispatch, state }){
      commit('SET_LOADING_STATE', {
        type: 'saveMedicalAppointment',
        value: false
      });

      try{
        const medicalAppointment = state.selectedMedicalAppointment;
        
        const medicalAppointmentData = {
          record: medicalAppointment.record
        };

        await patientRespository.storeMedicalAppointment(medicalAppointment.patient.id, medicalAppointmentData);
        dispatch('fetchMedicalAppointments');

      } catch(e){
        console.log(e);

      } finally{
        dispatch('clearMedicalAppointment');
        commit('SET_LOADING_STATE', {
          type: 'saveMedicalAppointment',
          value: false
        });
      }
    },

    async updateMedicalAppointment({ commit, dispatch, state }){
      commit('SET_LOADING_STATE', {
        type: 'saveMedicalAppointment',
        value: true
      });

      try{
        const medicalAppointment = state.selectedMedicalAppointment;

        const medicalAppointmentData = {
          record: medicalAppointment.record
        };

        await patientRespository.updateMedicalAppointment(medicalAppointment.patient.id, medicalAppointment.id, medicalAppointmentData);

      } catch(e){
        console.log(e);

      } finally{
        dispatch('clearMedicalAppointment');
        commit('SET_LOADING_STATE', {
          type: 'saveMedicalAppointment',
          value: false
        });
      }
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
      const medicalRecord = state.selectedMedicalAppointment.id;

      let title = 'Selecione um paciente ou prontuário';

      if( name !== null ){
        title = `Paciente: ${name}`;
      }

      if( medicalRecord !== null ){
        title += ` - Prontuário ${medicalRecord}`;
      }

      return title;
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
