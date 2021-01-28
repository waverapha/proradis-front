import repository from '../repository';

const moduleURL = '/medical-appointments';

export default {
    all(page = 1, include = null){
        return repository.get(moduleURL, {
            params: {
                page,
                include
            }
        });
    },
}