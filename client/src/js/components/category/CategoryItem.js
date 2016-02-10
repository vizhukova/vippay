import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import _  from 'lodash';

class CategoryItem extends React.Component {

    constructor() {
        super();
        this.state={
            error: {}
        };
        this.onEditClick = this.onEditClick.bind(this);
        this.onClickCat = this.onClickCat.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    onEditClick() {
        this.setState({
            edit: !this.state.edit
        })
    }

    onClickCat() {
        if (this.state.edit) this.onEditClick();
    }

    deleteCategory(e) {
        CategoriesAction.deleteCategory(this.props.item.id).catch((err) => {
            this.props.onError({
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Вы не можете удалить эту категорию.Возможно она связана с какими то продуктами.'
            })
        })
    }

    render() {
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove btn-warning btn-action btn-danger";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil btn-warning btn-action btn-default";

        return <tr>
                <td><Link to={`/category/${this.props.item.id}/products`}
                          className="category-link"
                          onClick={this.onClickCat}>{this.props.item.category}</Link></td>

                <td className="actions">
                    <button type="button" className={baseClassDel} data-t={this.props.id}
                            onClick={this.deleteCategory}></button>
                    <Link to={`/category/${this.props.item.id}`}>
                        <button type="button" className={baseClassEdit}></button>
                    </Link>
                </td>
            </tr>
    }
}

export default CategoryItem;