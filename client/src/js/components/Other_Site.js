import React from 'react';

class Other_Sites extends React.Component {

    constructor(){
        super();
        this.state = {
            domain: location.hostname,
            id_product: '1'
        }

        this.onChange = this.onChange.bind(this);
        this.basket = this.basket.bind(this);
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;

        this.setState(state);

        this.basket();
    }

    componentDidMount() {
        this.basket();
    }


    basket(e) {

        var basket = document.getElementById('basket');
        var basketPicDiv = document.createElement('div');
        var quantityDiv = document.createElement('div');
        var a = document.createElement('a');

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

        quantityDiv.appendChild(a);

        basket.innerHTML = '';
        basket.appendChild(basketPicDiv);
        basket.appendChild(quantityDiv);


////////////////////////////////////////////////////////////////////////////////

        var iframe = document.createElement('iframe');

        iframe.style.display = 'none';
        iframe.src = "http://" + basket.dataset.domain + "/partner";
        basket.appendChild(iframe);

        window.onmessage = function(e) {
            //console.log(e.origin)
            //console.log('onmessage:', e.data);
            var customer_id = e.data.data;

            var xmlhttp = getXmlHttp();

            var str = "http://" + basket.dataset.domain + "/api/basket" + "?customer_id=" + customer_id;
            //console.log('STR', str)

            xmlhttp.open("GET", str, true);
            xmlhttp.onreadystatechange = function(){

              if (xmlhttp.status == 200) {

                  var products = xmlhttp.responseText == "" ? [] : JSON.parse(xmlhttp.responseText);
                  var basket_id = products[0] ? products[0].basket_id : undefined;

                  var quantity = 0;

                  products.map((item) => {
                      quantity += item.quantity;
                  });

                  a.innerHTML = quantity ? quantity + ' ' + declOfNum( quantity, ['товар', 'товара', 'товаров'] ) : '';
                  a.setAttribute('href', "http://" + basket.dataset.domain + "/basket/" + basket_id);

              } else {
                  //handleError(xmlhttp.statusText); // вызвать обработчик ошибки с текстом ответа
              }
            };

            //console.log("customer_id=" + customer_id);
            //xmlhttp.send("customer_id=" + customer_id + "");
            //xmlhttp.send("a=1&b=2");
            xmlhttp.send(null);

        }

        iframe.onload = function(e) {

            var win = document.getElementsByTagName('iframe')[0].contentWindow;
            win.postMessage(JSON.stringify({key: 'id', method: 'get', data: ''}), "*");

        }

////////////////////////////////////////////////////////////////////////////////

    }

    render(){
        var self = this;
        return <div>
            <label>
                Введите домен (на пример client1.vippay.loc)
                <input type="text" name="domain" value={this.state.domain} onChange={this.onChange} />
            </label>
            <label>
                Введите id товара (на пример 1)
                <input type="text" name="id_product" value={this.state.id_product} onChange={this.onChange} />
            </label>

            <form method="POST" action={`http://${this.state.domain}/api/basket/${this.state.id_product}?_method=PUT`} encType="application/x-www-form-urlencoded">
                            <input type="hidden" name="_method" value="PUT" />
                            <input type="submit" value="Заказать"/>
                         </form>
            
            <div id="basket" data-domain={this.state.domain}></div>
        </div>
    }

}


export default Other_Sites;
