import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoryItem from './CategoryItem';
import CategoriesAction from'./../../actions/CategoriesAction';
import List from'./../../../../../common/js/List';
import _  from 'lodash';


class Category extends React.Component {

    constructor() {
        super();
        this.state = _.assign(CategoriesStore.getState(), {edit: false});
        _.assign(this.state, {error: {}});
        this.update = this.update.bind(this);
        this.onError = this.onError.bind(this);
    }

    onError(error) {
        this.setState({error: error});
    }

    componentDidMount() {
        CategoriesStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    componentWillReceiveProps(props){
        CategoriesAction.getAllCategories();
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
    }

    update(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    render() {

        return <List
            title="Категории"
            add_link="/category/new"
            items={this.state.categories}
            perPage={5}
            itemComponent={CategoryItem}
        />


    }

}

export default Category;