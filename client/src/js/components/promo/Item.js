import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import PromoAction from'./../../actions/PromoAction';
import _  from 'lodash';

class Item extends React.Component {

    constructor() {
        super();
        this.state={};

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
        if(! this.props.isActiveTariff) return;

        CategoriesAction.deleteCategory(this.props.item.id);
    }

    cancelClick(isDisabled){

        if(isDisabled){

            return function(e){
                e.preventDefault();
            }

        }else{

            return function(){}

        }

    }

    render() {
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove btn-warning btn-action btn-danger";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil btn-warning btn-action btn-default";

        return <tr>
                <td><Link to={`/category/${this.props.item.id}/products`}
                          className="category-link"
                          onClick={this.onClickCat}>{this.props.item.category}</Link></td>

                <td className="actions">

                    <button type="button" className={`${baseClassDel} ${this.props.isActiveTariff ? '' : 'disabled'}`}
                            data-t={this.props.id}
                            onClick={this.deleteCategory}></button>

                    <Link to={`/category/${this.props.item.id}`} onClick={this.cancelClick(!this.props.isActiveTariff)}>
                        <button type="button" className={`${baseClassEdit } ${this.props.isActiveTariff ? '' : 'disabled'}`}></button>
                    </Link>

                </td>
            </tr>
    }
}

export default Item;