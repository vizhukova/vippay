import React from 'react';


/**
 * Компонент оплаты тарифа через Яндекс.Деньги
 */
class Yandex extends React.Component {

    constructor() {
        super();
    }

    click(e){
        e.stopPropagation();
    }


    render() {
        return <div>
            <form method="POST" action={this.props.method.action}>
                <input type="hidden" name="receiver" value={this.props.method.receiver} />
                <input type="hidden" name="formcomment" value={this.props.method.formcomment} />
                <input type="hidden" name="short-dest" value={ this.props.method['short-dest'] } />
                <input type="hidden" name="label" value={this.props.method.label} />
                <input type="hidden" name="targets" value={this.props.method.targets} />
                <input type="hidden" name="quickpay-form" value='donate' />
                <input type="hidden" name="sum" value={this.props.method.sum} data-type="number" />
                <label>
                    <input type="radio" onClick={this.click} name="paymentType" value="PC" />
                    Яндекс.Деньгами
                </label><br/>
                <label>
                    <input type="radio" onClick={this.click} name="paymentType" value="AC" />
                    Банковской картой
                </label><br/>
                <input type="submit" className="btn" value="Оплатить" />
            </form>
            </div>
    }
}


export default Yandex;