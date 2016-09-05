import React from 'react';

/**
 * Информация о настройках корзины
 */
class Basket extends React.Component {

    constructor(){
        super();
        this.state= {
            domain: location.host
        };
    }

    render(){
        var css = <a href="http://cdn.inpay.info/basket.css">http://cdn.inpay.info/basket.css</a>;

        var js = <a href="http://cdn.inpay.info/basket.js">http://cdn.inpay.info/basket.js</a>;

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