<template>
  <div class="modal-card" style="width: auto">

    <form>

      <header class="modal-card-head has-background-secondary">
        <p class="modal-card-title has-text-white">Novo paciente</p>

        <button
          type="button"
          class="delete"
          @click="$emit('close')" />
      </header>

      <section class="modal-card-body">

        <b-field label="Nome">
          <b-input
          placeholder="Digite o nome"
          v-model="patient.name"
          required
          minlength="3"
          maxlength="255"
          ></b-input>
        </b-field>

        <b-field label="Data de Nascimento">
          <b-input
          placeholder="Digite a data de nascimento"
          v-model="patient.birthdate"
          required
          minlength="10"
          maxlength="10"
          v-mask="'##/##/####'"
          ></b-input>
        </b-field>

        <b-field label="Gênero">
          <b-select
          expanded
          placeholder="Selecione um gênero"
          required
          v-model="patient.gender">
            <option
            v-for="gender in genders"
            :value="gender.code"
            :key="gender.code">{{ gender.name }}</option>
          </b-select>
        </b-field>

        <b-field label="CPF">
          <b-input
          placeholder="Digite o CPF"
          v-model="patient.document"
          required
          minlength="14"
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
          label="Cadastrar paciente"
          icon-left="plus"
          :loading="isSending"
          @click="storePatient()">Novo paciente</b-button>
      </footer>

    </form>

  </div>

</template>

<script>

import patientRespository from '@/repository/patient';

export default {
  data(){
    return {
      isSending: false,
      patient: {
        name: '',
        birthdate: '',
        gender: null,
        document: '',
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
      this.isSending = true;
      
      try{
        const patientData = this.patient;

        patientData.document = patientData.document.replace(/\.|-/g, '');

        await patientRespository.store(patientData);

        this.clearForm();
      } catch(e){
        console.log(e);
      } finally{
        this.isSending = false;
      }
    },

    clearForm(){
      for (const key in this.patient) {
        if (Object.hasOwnProperty.call(this.patient, key)) {
          this.patient[key] = null;
        }
      }
    }
  },
}
</script>