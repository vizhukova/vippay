import React from 'react';

class Other_Sites extends React.Component {

    constructor(){
        super();
        this.state = {
            domain: 'client1.vippay.loc',
            id_product: '1'
        }

        this.onChange = this.onChange.bind(this);
        this.basket = this.basket.bind(this);
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;

        this.setState(state);
    }

    componentDidMount() {
        this.basket();
    }

    basket(e) {

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
                            <input type="hidden" name="redirect_link" value={document.location.href} />
                            <input type="submit" value="Заказать"/>
                         </form>
            <div id="basket" data-domain="client1.vippay.loc">

            </div>
        </div>
    }

}


export default Other_Sites;
