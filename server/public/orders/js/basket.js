
var total = 0;
var totalItem = $('#total');
var basketItems = JSON.parse($('[name="basketItems"]')[0].value);
var currency = JSON.parse($('[name="currency"]')[0].value);

var basketForm = $('#basket');
var submitButton = $('#submit');

var pendingForm = $('#form');


window.onload = function() {

    //////////////////////////common//////////////////////////

    setTotal();

    if(pendingForm) pendingForm.on('submit', function(e) {finishPending(e)});

    if(basketForm) basketForm.on('submit', function(e) {

                        e.preventDefault();
                        if(basketItems.length) onClickSubmitButton();
                    });

    if(! basketItems.length) {
        submitButton.addClass('disabled');
    }

}

function setTotal() {

    var summ = 0;

    basketItems.map((item) => {
        summ += +item.total_price;
    })

    total = summ;

    totalItem.html( summ.toFixed(2) + currency.name );
}

//////////////////////////basket//////////////////////////

function onClickSubmitButton() {

    ApiActions.put('basket', basketItems).then((res) => {

      location.href = res.redirect;

    }).catch((err) => {

    })
}


function onChange(index, target) {

    var newVal = parseInt(target.value);
    newVal = isNaN(newVal) || newVal < 1 ? 1 : newVal;

    $(target).val(newVal);
    basketItems[index].quantity = newVal;
    basketItems[index].total_price = newVal * basketItems[index].price_per_unit;

    setTotal();

}

$('.remove').on('click', function(e) { onDelete(e) });

function onDelete(e) {

    e.preventDefault();
    var index = $(e.target).attr('data-index');
    ApiActions.remove('basket', {id: basketItems[index].id}).then(() => {

        location.reload();

    })
}

//////////////////////////pending//////////////////////////

function finishPending(e) {

    e.preventDefault();

        var data = {
            price: $('#price').html(),
            condition: $('#condition').html(),
            name: $('[name="name"]')[0].value,
            email: $('[name="email"]')[0].value,
            comment: $('[name="comment"]')[0].value,
            telephone: $('[name="telephone"]')[0].value,
            promo_code: $('[name="promo_code"]')[0].value,
            total: total
        };

    var product_array = [];
    var prod_id = [];

    basketItems.map((item) => {
        product_array.push(item.product);
        prod_id.push(item.product.id);
    });

    data.product = product_array;

    if( data.promo_code.replace(new RegExp(" ",'g'),"").length ) {

            ApiActions.get(`order/promo`, {product_id: prod_id, code: data.promo_code}).then(function(obj){

                showModal();

                data.discount = obj.promo.discount;
                setPromoMessage(data,  obj.promo_prod);

            }).catch(function(err){
                setAlert({
                   type: 'error',
                   text: err.responseText,
                   title: 'Ошибка'
               });

            })

        } else {//no promo

            sendOrder(data);

        }
}

function setPromoMessage(data, promo_products) {

    var newTotal = 0;
    var modalBody = $('.modal-body');
    var modalTitle = $('.modal-title');
    var footerButton = $('#continue');

    basketItems.map((item) => {
        var res = promo_products.filter((promos) => promos.product_id == item.product.id);

        if(res.length > 0) newTotal += item.total_price - item.total_price * data.discount / 100;
        else newTotal += +item.total_price;
    });

    var span = $('<span></span>').text('Общая сумма заказа сейчас '  + total.toFixed(2) + ' ,\
                   Со скидкой ' + data.discount + ' % составляет ' + newTotal.toFixed(2) );

        footerButton.html('Продолжить');
        footerButton.on('click', function() {


            data.total = newTotal;
            sendOrder(data);
            footerButton.unbind('click');

        });

        modalTitle.html('Информация');
        modalBody.html(span);
}

function sendOrder(data) {

    var redirect;
     var id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);

    ApiActions.post('order', data).then((res) => {

        redirect = res.redirect;
        return ApiActions.put('basket/complete', {step: 'complete', id: id});

    }).then((basketData) => {

        location.href = redirect;

    }).catch((err) => {

      setAlert({
               type: 'error',
               text: 'Проверьте правильность ввода данных',
               title: 'Ошибка'
           });

    })

}
