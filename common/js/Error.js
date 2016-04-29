import React from 'react';
import {RoutingContext, Link} from 'react-router'

/**
 * Компонент ошибки неоплаченного тарифа
 */
class Error extends React.Component {

    constructor(){
        super();
        this.state={};
    }

    render(){
        var self = this;
        return <div className="error-block">
            <div className="btn">
                <Link to="/profile" activeClassName="active">Перейдите в профиль и оплатите тариф</Link>
            </div>
        </div>


    }


}


export default Error;