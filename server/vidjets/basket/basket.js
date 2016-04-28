var basket = document.getElementById('basket');
var basketPicDiv = document.createElement('div');
var quantityDiv = document.createElement('div');
var a = document.createElement('a');
var span = document.createElement('span');

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

basketPicDiv.setAttribute('class', 'basket-picture');
quantityDiv.setAttribute('class', 'basket-quantity');
a.setAttribute('href', '#');
span.innerHTML = '0 товаров';

quantityDiv.appendChild(a);
quantityDiv.appendChild(span);

basket.innerHTML = '';
basket.appendChild(basketPicDiv);
basket.appendChild(quantityDiv);


var iframe = document.createElement('iframe');

iframe.style.display = 'none';
iframe.src = "http://" + basket.dataset.domain + "/partner";
basket.appendChild(iframe);

window.onmessage = function(e) {

    var customer_id = e.data.data;
    var xmlhttp = getXmlHttp();
    var str = "http://" + basket.dataset.domain + "/api/basket" + "?customer_id=" + customer_id;

    xmlhttp.open("GET", str, true);
    xmlhttp.onreadystatechange = function(){

      if (xmlhttp.status == 200) {

          var products = xmlhttp.responseText == "" ? [] : JSON.parse(xmlhttp.responseText);
          var basket_id = products[0] ? products[0].basket_id : undefined;

          var quantity = 0;

          products.map( function(item) {
              quantity += item.quantity;
          });
          span.innerHTML = '';
          a.innerHTML = quantity ? quantity + ' ' + declOfNum( quantity, ['товар', 'товара', 'товаров'] ) : '';
          a.setAttribute('href', "http://" + basket.dataset.domain + "/basket/" + basket_id);

      } else {
          span.innerHTML = '0 товаров';
          a.innerHTML = '';
      }
    };

    xmlhttp.send(null);

}

iframe.onload = function(e) {

    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    win.postMessage(JSON.stringify({key: 'id', method: 'get', data: ''}), "*");

}

