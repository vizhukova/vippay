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
        this.state = SettingsStore.getState() || {links: []};

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

        return <div>
            <div className="boxed">
                {this.state.links.map(function (link) {

                    return <h5 className="form-group">
                        <a href={`${link.link}`}>{link.link}</a> - {link.name} <br/>
                    </h5>

                })}

            </div>
        </div>

    }

}


export default Links;