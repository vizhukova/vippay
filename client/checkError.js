import AlertActions from './../common/js/Alert/AlertActions';
import AuthActions from './src/js/actions/AuthActions';
import SettingsAction from './src/js/actions/SettingsAction';

module.exports = {
    check(error) {
        switch(error.status) {
            case 402: {
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Данные действия вам не доступны.'
                }, true);
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
            case 403: {
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: error.responseText
                }, true);
                SettingsAction.setIsActive(false);
                break;
            }

            case 401: {
                window.location.replace(`http://auth.${(window.location.host).slice(window.location.host.indexOf('.') + 1)}/#/auth`);
            }

            default: {
                 // no AlertActions.set при регистрации/логине приходит ошибка что пользователь не зарегестрирован
            }

        }
    }
}