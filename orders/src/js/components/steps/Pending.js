import React from 'react'
import {RoutingContext, Link} from 'react-router'
import Payment from './Payment'

class Pending extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {

    }

    update(state){

    }

    render() {
        return <div>
            <div>
                <div className="step"><span className="step-text">1</span></div>
                <div className="content-step">
                    <img className="img-responsive img-thumbnail pull-left image" src="http://www.bangkok.com.ua/images/photo/fruit/pomelo.jpg" width="300px" height="auto"/>
                    <div className="field">Название</div>
                    <div className="field">Цена</div>
                    <div className="description">ОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписаниеОписание</div>
                    <button type="button" className="btn btn-danger btn-lg">Заказать</button>
                </div>
            </div>
           </div>
    }
}

export default Pending;
