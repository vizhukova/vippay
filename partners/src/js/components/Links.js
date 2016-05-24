import React from 'react';
import {RoutingContext, Link} from 'react-router'
import SettingsActions from'./../actions/SettingsActions'
import SettingsStore from './../stores/SettingsStore'

/**
 * Партнёрская ссылка
 */
class Links extends React.Component {

    constructor() {
        super();
        this.state = SettingsStore.getState() || {clients: []};

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        SettingsActions.get();
        SettingsActions.getClients();
        SettingsActions.getCurrentClient();
        SettingsActions.getCurrentPartner();
        SettingsStore.listen(this.update)
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    render() {

        console.log('asdfasdf',this.state);
        var self = this;

        return <div>
            <div className="boxed">
                {this.state.clients ? this.state.clients.map(function (client) {

                    var link = `http://${client.login}.${self.state.domain}/partners?ref=${self.state.partner.login}`;

                    return <h5 className="form-group">
                        <a href={link}>{link}</a><br/>
                    </h5>

                }) : null}

            </div>
        </div>

    }

}


export default Links;