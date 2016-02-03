import React from 'react';
import {RoutingContext, Link} from 'react-router'
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore'


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

        return  <div><Link to={`${this.state.link}`}>Ссылка</Link></div>

    }
//<a href={this.state.link}>Ссылка</a>

}


export default Settings;