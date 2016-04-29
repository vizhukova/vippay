/**
 * Строки описания для платёжных систем
 * @type {{interkassa: string, id_kassa: string, id_confirm: string, interkassa_details: string, interkassa_more_info: *, yandex: string, receiver: string, yandex_details: string, yandex_more_info: *, liqpay: string, public_key: string, private_key: string, liqpay_details: string, liqpay_more_info: string, pay_after_receive: string, pay_after_receive_details: string, send_to_card: string, send_to_card_details: string, western_union: string, western_union_details: string}}
 */
module.exports = {
    "interkassa": "Интеркасса",
    "id_kassa": "Номер кассы",
    "id_confirm":"Номер подтверждения",
    "interkassa_details": "Введите данные о платежной системе",
    "interkassa_more_info": `Шаг1: Зайдите на сайт www.interkassa.com
Шаг2: В разделе "Верификация кассы" в колонке "С помощью файла" скопируйте название, предлагаемое сайтом, для файла с расширением .txt (на пример: 123.txt). Скопируйте его в поле "Номер кассы", так чтобы получилось, на пример: 123
Шаг3: В разделе "Верификация кассы" в колонке "С помощью файла" скопируйте содержимое, предлагаемое сайтом, для файла (на пример: 456). Скопируйте его в поле "Номер подтверждения"
Шаг4: Сохраните изменения.`,

    "yandex": "Яндекс",
    "receiver": "Номер яндекс кошелека",
    "yandex_details": "Введите данные о платежной системе",
    "yandex_more_info": `Шаг1 : Скопируйте номер вашего кошелька с сайта money.yandex.ru в поле 'Номер яндекс кошелька'
Шаг2: На сайте money.yandex.ru в поле HTTP-уведомления напишите ${location.host}/api/payments/yandex
Шаг3: На той же странице, где вы настраивали HTTP-уведомления, поставьте галочку напротив 'Отправлять уведомления'. Сохраните изменения на money.yandex.ru
Шаг4: Сохраните изменения на нашем сайте.`,

     "liqpay": "Liqpay",
    "public_key": "Публичный ключ",
    "private_key": "Приватный ключ",
    "liqpay_details": "Введите данные о платежной системе",
    "liqpay_more_info": "Скопируйте ваш публичный и приватный ключи в соответствующие поля",


    "pay_after_receive": 'Наложный платеж',
    "pay_after_receive_details": "Оплата при  получении",

    "send_to_card": "Банковский перевод",
    "send_to_card_details": "Мы отошлем вам товар после получения оплаты на карту",

    "western_union": "Western Union",
    "western_union_details": "Мы отошлем вам товар после получения перевода"

};