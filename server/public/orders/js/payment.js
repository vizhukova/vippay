var payments = JSON.parse($('[name="payments"]')[0].value)[0];
var paymentSettings = JSON.parse($('[name="paymentSettings"]')[0].value)[0];
var order = JSON.parse($('[name="order"]')[0].value)[0];

var container = $('#container');
var description = $('#description');
var paymentBlock = $('#paymentBlock');
var descriptionContainer = $('.description');

window.onload = function() {

    paymentSettings.map((item) => {

        if(item.active) {

            var div = $(`<div class="col-md-3">
                <h4 class="boxed text-center">
                    ${ paymentTranslate[item.name] }
                </h4>
            </div>`);

            div.on('click', function(e) {

                descriptionContainer.removeClass('hide');

                if(item.name == 'yandex' || item.name == 'interkassa' || item.name == 'liqpay' || item.name == 'paypal') {

                    hidePaymentSettingsItems(item.name);
                }

                var id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
                    ApiActions.put(`order/payments/${id}`, {method: item.name, id: id});

                description.html(item.details || paymentTranslate[`${item.name}_details`]);

                if(item.details && ! item.details.length) descriptionContainer.addClass('hide');


            });

            container.append(div);
        }

    })

};

function hidePaymentSettingsItems(name) {

    Object.keys(payments).map((item) => {

        if(item != name) $(`#${item}`).addClass('hide');
        else $(`#${item}`).removeClass('hide');

    })

}
