
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


    var basket = document.getElementById('basket');
    var a = document.createElement('a');

    a.setAttribute('href', '#');
    basket.innerHTML = '';
    basket.appendChild(a);

    var xmlhttp = getXmlHttp();
    xmlhttp.open("GET", "http://" + basket.dataset.domain + "/api/basket", true);
    xmlhttp.onreadystatechange = function(){

      if (xmlhttp.status == 200) {

          var products = xmlhttp.responseText == "" ? 0 : JSON.parse(xmlhttp.responseText);
          var basket_id = products[0] ? products[0].basket_id : undefined;
          a.innerHTML = products.length;
          a.setAttribute('href', "http://" + basket.dataset.domain + "/basket/" + basket_id);

      } else {
          //handleError(xmlhttp.statusText); // вызвать обработчик ошибки с текстом ответа
      }
    };

    xmlhttp.send(null);
