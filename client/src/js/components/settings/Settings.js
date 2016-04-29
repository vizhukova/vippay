import React from 'react';
import {RoutingContext, Link} from 'react-router'
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore'

/**
 * Партнёрская ссылка
 */
class Settings extends React.Component {

    constructor(){
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        SettingsAction.get();
        SettingsStore.listen(this.update)
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }


    render(){

        return  <div>
            <div className="boxed">
                <h5 className="form-group">
                     <a href={`${this.state.link}`}>{this.state.link}</a> <br/>
                    По этой ссылке партнер может зарегистрироваться и просматривать выставленные вами товары.
                    Скопируйте ее и передайте вашему партнеру.
                </h5>
            </div>
        </div>

    }

}


export default Settings;