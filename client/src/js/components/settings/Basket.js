import React from 'react';


class Basket extends React.Component {

    constructor(){
        super();
        this.state= {
            domain: location.host
        };
    }

    render(){
        var self = this;
        var css = `#basket {
                  background: url("https://pixabay.com/static/uploads/photo/2015/10/22/16/42/icon-1001596_960_720.png") no-repeat no-repeat;
                  text-align: center;
                  background-size: 100%;
                  width: 100px;
                  height: 100px;
                }

                #basket a {
                  color: #C51E1E;
                  text-decoration: none;
                  padding-top: 30px;
                  font-size: xx-large;
                }`;

        var js = `basket(e) {
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

                  }
              };

                xmlhttp.send(null);
            }`;
        var html = `<div id="basket" data-domain="${this.state.domain}"></div>`;

        return <div className="boxed">
            <h3>Код для размещения корзины на своем сайте</h3>
            <h4> файл со стилями (.css)</h4>
            <span>{css}</span>
            <h4> файл с логикой (.js)</h4>
            <span>{js}</span>
             <h4> файл отображения (.html)</h4>
            <span>{html}</span>
        </div>


    }


}


export default Basket;