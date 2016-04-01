function getXmlHttp(){
          var xmlhttp;
          try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
            try {
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
              xmlhttp = false;
            }
          }
          if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
          }
          return xmlhttp;
        }

        function declOfNum(number, titles) {
            var cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number % 100 > 4 && number % 100 < 20)
                ? 2
                : cases[ (number % 10 < 5) ? number % 10 : 5] ];
        }


        var basket = document.getElementById('basket');
        var basketPicDiv = document.createElement('div');
        var quantityDiv = document.createElement('div');
        var a = document.createElement('a');

        basketPicDiv.setAttribute('class', 'basket-picture');
        quantityDiv.setAttribute('class', 'basket-quantity');
        a.setAttribute('href', '#');

        quantityDiv.appendChild(a);

        basket.innerHTML = '';
        basket.appendChild(basketPicDiv);
        basket.appendChild(quantityDiv);

        var xmlhttp = getXmlHttp();
        xmlhttp.open("GET", "http://" + basket.dataset.domain + "/api/basket", true);
        xmlhttp.onreadystatechange = function(){

          if (xmlhttp.status == 200) {

              var products = xmlhttp.responseText == "" ? [] : JSON.parse(xmlhttp.responseText);
              var basket_id = products[0] ? products[0].basket_id : undefined;

              var quantity = 0;

              products.map((item) => {
                  quantity += item.quantity;
              });

              a.innerHTML = quantity + ' ' + declOfNum( quantity, ['товар', 'товара', 'товаров'] );
              a.setAttribute('href', "http://" + basket.dataset.domain + "/basket/" + basket_id);

          } else {
              //handleError(xmlhttp.statusText); // вызвать обработчик ошибки с текстом ответа
          }
        };

        xmlhttp.send(null);