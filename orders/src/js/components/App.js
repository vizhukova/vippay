import React from 'react';
import {RoutingContext, Link} from 'react-router';
import _ from 'lodash';


class App extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {

        return <div>
            {this.props.children}
        </div>

    }
}

export default App;