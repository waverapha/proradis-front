import repository from '../repository';

const moduleURL = '/patients';

export default {
    all(include = null){
        return repository.get(moduleURL, {
            params: {
                include
            }
        });
    },

    store(data){
        return repository.post(`${moduleURL}`, data);
    },

    medicalAppointments(patient, id){
        return repository.get(`${moduleURL}/${patient}/medical-appointments/${id}`);
    },

    storeMedicalAppointment(patient, data){
        return repository.post(`${moduleURL}/${patient}/medical-appointments`, data);
    },

    updateMedicalAppointment(patient, id, data){
        return repository.put(`${moduleURL}/${patient}/medical-appointments/${id}`, data);
    }
}