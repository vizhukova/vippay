
var tariffSelect = $('.select');
var selectContainer = $('.select-container');
var userId = $('#userId').val();

$('.price_col').on('click', function(e) {

    var isChosen = $(e.currentTarget).hasClass('chosen');

    $('.price_col').removeClass('chosen');
    $('.payment').addClass('hide');


    if( ! isChosen ) {

        $(e.currentTarget).addClass('chosen');
        $(e.currentTarget).find('.payment').removeClass('hide');

    }

});

selectContainer.on('click', function(e) {

    e.stopPropagation();

});

tariffSelect.on('change', function(e) {

        var currentItem = ".price_col" + $(e.target).attr('id');
        var total = $(currentItem).find('.total');
        var perMonth = $(currentItem).find('.per-month');
        var data = $(e.target).val();
        var tariff = $(currentItem).data('tariff');
        var yandex = $(currentItem).find('.yandex');
        var interkassa = $(currentItem).find('.interkassa');

        data = data ? JSON.parse(data) : {};

        total.html(data.price + " руб");
        perMonth.html((data.price / data.time).toFixed(2) + " руб / мес");

        yandex.find("input[name$='label']").attr('value', tariff + '::' + data.time + '::' + userId)
        yandex.find("input[name$='formcomment']").attr('value', tariff + '::' + data.time + '::' + userId)
        yandex.find("input[name$='short-dest']").attr('value', tariff + '::' + data.time + '::' + userId)
        yandex.find("input[name$='sum']").attr('value', data.price)


        interkassa.find("input[name$='ik_pm_no']").attr('value', tariff + '::' + data.time + '::' + userId)
        interkassa.find("input[name$='ik_am']").attr('value', tariff + '::' + data.time + '::' + userId)
        interkassa.find("input[name$='ik_am']").attr('value', data.price)

    })

