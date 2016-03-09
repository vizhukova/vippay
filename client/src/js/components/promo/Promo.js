import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import Item from './Item';
import PromoAction from'./../../actions/PromoAction';
import List from'./../../../../../common/js/List';
import _  from 'lodash';


class Promo extends React.Component {

    constructor() {
        super();
        this.state = PromoStore.getState();
        this.update = this.update.bind(this);

    }

    componentDidMount() {
        PromoStore.listen(this.update);
        PromoAction.get();
    }

    componentWillUnmount() {
        PromoStore.unlisten(this.update);
    }

    update(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    render() {
        return <List
            title="Промо акции"
            add_link="/promo/new"
            add_link_name = 'Добавить промо акцию'
            items={this.state.promos}
            itemComponent={Item}
            isPaginate={true}
        />


    }

}

export default Promo;