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
          @click="storePatient()">Novo paciente</b-button>
      </footer>

    </form>

  </div>

</template>

<script>
export default {
  data(){
    return {
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
    storePatient(){
      const data = this.patient;

      const headers = new Headers;
      headers.append('Content-type', 'application/json');

      fetch('http://localhost:9000/patients', {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      })
      .then(response => response.json())
      .then(patient => {
        this.clearForm();
        console.log(patient);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        
      });
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