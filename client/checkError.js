import AlertActions from './../common/js/Alert/AlertActions';
import AuthActions from './src/js/actions/AuthActions';
import SettingsAction from './src/js/actions/SettingsAction';

/**
 * Обработка серверных ошибок
 */
export default {
    check(error) {
        switch(error.status) {
            case 402: {//ограничения по тарифу
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Данные действия вам не доступны.'
                }, true);
                break;
            }

            case 400: {//общие ошибки
                AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: error.responseText
                }, true);
                break;
            }
            case 403: {//тариф не оплачен и действие пробного периода окончено
                SettingsAction.setIsActive(false);
                break;
            }

            case 401: {//клиент не залогинен
                window.location.replace(`http://auth.${(window.location.host).slice(window.location.host.indexOf('.') + 1)}/#/auth`);
            }

        }
    }
}