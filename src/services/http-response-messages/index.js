import { ToastProgrammatic as Toast } from 'buefy';

const messages = {
    'post': {
        '200': 'Tudo certinho!',
        '201': 'Criado com sucesso',
    },
    'put': {
        '200': 'Editado com sucesso!'
    },
    'delete': {
        '204': 'Deletado com sucesso!'
    }
}

export const handlerResponseSuccessMessages = (response) => {
    const {status, data, config} = response;

    if( (status >= 200 && status < 300) && (config.method === 'post' || config.method === 'put') ){

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                Toast.open({
                    position: 'is-top',
                    type: 'is-success',
                    duration: 3000,
                    message: messages[config.method][status]
                })
            }
        }
    }
}

export const handlerResponseErrorMessages = (response) => {
    const {status, data} = response;

    if( status === 422 ){
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                Toast.open({
                    position: 'is-top',
                    type: 'is-danger',
                    duration: 3000,
                    message: data[key][0]
                })
            }
        }
    }
}