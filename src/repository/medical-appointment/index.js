import repository from '../repository';

const moduleURL = '/medical-appointments';

export default {
    all(include = null){
        return repository.get(moduleURL, {
            params: {
                include
            }
        });
    },
}