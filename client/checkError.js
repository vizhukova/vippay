import AlertActions from './../common/js/AlertActions';

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
                });
                break;
            }

            default: {
                 AlertActions.set({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Похоже что то пошло не так'
                });
            }

        }
    }
}