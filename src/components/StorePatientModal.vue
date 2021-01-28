<template>
  <div class="modal-card" style="width: auto">

    <form @submit.stop.prevent="storePatient()" style="overflow-y: auto">

      <header class="modal-card-head has-background-secondary">
        <p class="modal-card-title has-text-white">Novo paciente</p>

        <button
          type="button"
          class="delete"
          @click="$emit('close')" />
      </header>

      <section class="modal-card-body">

        <!-- :custom-class="{'is-danger': !$v.patient.name.required}" -->

        <b-field label="Nome"
        :type="{'is-danger': !$v.patient.name.required && $v.patient.name.$error}"
        :message="{'Preencha esse campo': $v.patient.name.$error}">
          <b-input
          :has-counter="false"
          placeholder="Digite o nome"
          v-model.trim="patient.name"
          maxlength="255"
          ></b-input>
        </b-field>

        <b-field label="Data de Nascimento"
        :type="{'is-danger': !$v.patient.birthdate.required && $v.patient.birthdate.$error}"
        :message="{'Preencha esse campo': $v.patient.birthdate.$error}">
          <b-input
          :has-counter="false"
          placeholder="Digite a data de nascimento"
          v-model="patient.birthdate"
          maxlength="10"
          v-mask="'##/##/####'"
          ></b-input>
        </b-field>

        <b-field label="Gênero"
        :type="{'is-danger': !$v.patient.gender.required && $v.patient.gender.$error}"
        :message="{'Escolha um item da lista': $v.patient.gender.$error}">
          <b-select
          expanded
          placeholder="Selecione um gênero"
          v-model="patient.gender">
            <option
            v-for="gender in genders"
            :value="gender.code"
            :key="gender.code">{{ gender.name }}</option>
          </b-select>
        </b-field>

        <b-field label="CPF"
        :type="{'is-danger': !$v.patient.document.required && $v.patient.document.$error}"
        :message="{'Preencha esse campo': $v.patient.document.$error}">
          <b-input
          :has-counter="false"
          placeholder="Digite o CPF"
          v-model="patient.document"
          maxlength="14"
          v-mask="'###.###.###-##'"
          ></b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <b-button
          label="Voltar"
          @click="$emit('close')">
        </b-button>
        <b-button
          native-type="submit"
          label="Cadastrar paciente"
          icon-left="plus"
          :loading="isSending">Novo paciente</b-button>
      </footer>

    </form>

  </div>

</template>

<script>

import { required, minLength, maxLength } from 'vuelidate/lib/validators'

import patientRespository from '@/repository/patient';

export default {
  data(){
    return {
      isSending: false,
      patient: {
        name: 'Rapha V',
        birthdate: '02/04/1987',
        gender: 'M',
        document: '123.456.789-00',
      },
      genders: [
        {
          code: 'M',
          name: 'Masculino'
        },
        {
          code: 'F',
          name: 'Feminino'
        },
        {
          code: 'T',
          name: 'Transgênero'
        },
        {
          code: 'O',
          name: 'Outro'
        },
      ],
    }
  },

  methods: {
    async storePatient(){

      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.isSending = true;
      
      try{
        const patientData = Object.assign({}, this.patient);

        patientData.document = patientData.document.replace(/\.|-/g, '');

        await patientRespository.store(patientData);

        this.clearForm();

        this.$v.$reset();

        this.$emit('close');

      } catch(error){
        error;
      } finally{
        this.isSending = false;
      }
    },

    clearForm(){
      const patient = this.patient;
      for (const key in patient) {
        if (Object.hasOwnProperty.call(patient, key)) {
          patient[key] = null;
        }
      }
    }
  },

  validations: {
    patient: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      birthdate: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      gender: {
        required,
        minLength: minLength(1)
      },
      document: {
        required,
        minLength: minLength(14),
        maxLength: maxLength(14)
      }
    }
  }
}
</script>