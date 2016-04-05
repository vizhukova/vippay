    var form = $('#form');
    var product = JSON.parse($('[name="product"]')[0].value)[0];
    var upsell_products = JSON.parse($('[name="upsell_products"]')[0].value);
    var currency = JSON.parse($('[name="currency"]')[0].value);
    var timerId;
    var total = 0;

    window.onload = function (e) {

        setDelivery(0);

    };

    function onChange(index, e) {

        setDelivery(index);

    }

    function setDelivery(index) {

        if (product.material) {

            total = parseFloat(product.delivery[index].price) + parseFloat(product.price);

            $('#condition').html(product.delivery[index].condition);
            $('#price').html(product.delivery[index].price);
            $('#priceToSent').attr('value', product.delivery[index].price);
            $('#total').html(total.toFixed(2));

        } else {

            total = parseFloat(product.price);

            $('#total').html(total.toFixed(2));

        }


    }

    form.on('submit', function (e) {
        onSubmit(e);
    });

    function onSubmit(e) {

        e.preventDefault();

        var data = {
            price: $('#price').html(),
            condition: $('#condition').html(),
            name: $('[name="name"]')[0].value,
            email: $('[name="email"]')[0].value,
            comment: $('[name="comment"]')[0].value,
            telephone: $('[name="telephone"]')[0].value,
            promo_code: $('[name="promo_code"]')[0].value,
            total: $('#total').html(),
            product: product

        };

        if( data.promo_code.replace(new RegExp(" ",'g'),"").length ) {
            var id = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);

            ApiActions.get(`order/promo`, {product_id: [id], code: data.promo_code}).then(function(obj){

                data.discount = obj.promo.discount;

                showModal();
                setPromoMessage(data);

            }).catch(function(err){

                setAlert({
                   type: 'error',
                   text: err.responseText,
                   title: 'Ошибка'
               });

            })

        } else {//no promo

            beforeSend(data);

        }
    }

    function beforeSend(data) {

        if(upsell_products.length) {

            showModal();
            setUpsellProducts(data);

        } else {

            var newData = $.extend({}, data);
            newData.product = [newData.product];
            sendOrder(newData);

        }

    }

    function setUpsellProducts(data) {

        var modalBody = $('.modal-body');
        var modalTitle = $('.modal-title');
        var footerButton = $('#continue');
        var classNameMiddle = 'col-md-2';
        var classNameLong = 'col-md-3';
        var classNameShort = 'col-md-1';

        modalTitle.html('Выбранный товар вы можете купить в наборе');

        var newDiv = $('<div></div>');

        var head = '<div class="row">' +
                '<div class="' + classNameLong + '"><b>Изображение</b></div>' +
                '<div class="' + classNameMiddle + '"><b>Товар</b></div>  ' +
                '<div class="' + classNameLong + '"><b>Цена выбранного товара</b></div>  ' +
                '<div class="' + classNameMiddle + '"><b>Цена набора</b></div>  ' +
                '</div>';

        newDiv.append(head);

        for (var i = 0; i < upsell_products.length; i++) {

            var button = $('<button class="btn btn-action"></button>');
            button.html('Купить');

            (function(upsell_product) {
                button.on('click', function(e) {

                    var newData = $.extend({}, data);
                    newData.product = [newData.product, upsell_product];
                    newData.promo_code = '';
                    newData.total = parseFloat(upsell_product.upsell_price) + ( parseFloat(data.price) || 0 );
                    sendOrder(newData);

                });
            })(upsell_products[i]);

            var div = $('<div class="row"></div>');

            $(div).append(
                '<div class="' + classNameLong + '"><img width="100px" height="auto" src="' + upsell_products[i].image + '"/></div>' +
                '<div class="' + classNameMiddle + '">' + upsell_products[i].name + '</div>  ' +
                '<div class="' + classNameLong + '">' + data.product.price + '</div>  ' +
                '<div class="' + classNameMiddle + '">' + upsell_products[i].upsell_price + '</div>  '
            );
            $(div).append($('<div class="' + classNameShort + '"></div>').append(button));

            newDiv.append(div);
        }

        modalBody.html(newDiv);


        footerButton.html('Нет, спасибо');
        footerButton.on('click', function(e) {

            var newData = $.extend({}, data);
            newData.product = [newData.product];
            sendOrder(newData);
            footerButton.unbind('click');

        })

    }


    function setPromoMessage(data) {

        var newTotal = total - total * data.discount / 100;
        data.price = data.price - data.price * data.discount / 100;
        var modalBody = $('.modal-body');
        var modalTitle = $('.modal-title');
        var footerButton = $('#continue');

        var span = $('<span></span>').text('Общая сумма заказа сейчас '  + total + currency.name + ' ,\
                   Со скидкой ' + data.discount + ' % составляет ' + newTotal + currency.name);

        footerButton.html('Продолжить');
        footerButton.on('click', function() {

            data.total = newTotal;
            beforeSend(data);
            footerButton.unbind('click');

        });

        modalTitle.html('Информация');
        modalBody.html(span);

    }

    function sendOrder(data) {

        hideModal();
        ApiActions.post('order', data).then((res) => {

            location.href = res.redirect;

        }).catch((err) => {
            setAlert({
                title: 'Ошибка',
                text: 'Проверьте правильность ввода данных',
                type: 'error'
            })
        })

    }



