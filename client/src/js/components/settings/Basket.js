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
        var css = <a href="http://cdn.vippay.info/basket.css">http://cdn.vippay.info/basket.css</a>;

        var js = <a href="http://cdn.vippay.info/basket.js">http://cdn.vippay.info/basket.js</a>;

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