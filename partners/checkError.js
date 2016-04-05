import AlertActions from './../common/js/Alert/AlertActions';
import AuthActions from './src/js/actions/AuthActions';

module.exports = {
    check(error) {

        switch(error.status) {
            case 402: {
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Данные действия вам не доступны. Оплатите тариф.'
                });
                break;
            }

            case 400: {
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: error.responseText
                }, true);
                break;
            }

                case 401: {
                window.location.replace(`${window.location.origin}/partner/#/auth`);
                break;
            }
        }
    }
}