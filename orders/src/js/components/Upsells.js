import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ModalActions  from './../../../../common/js/ModalWindow/ModalActions';
import OrderActions  from './../actions/OrdersActions';
import _  from 'lodash';


class UpsellItem extends React.Component {

     constructor() {
        super();
        this.state={};

         this.addApsell = this.addApsell.bind(this);
    }

    addApsell(e) {
        OrderActions.add({prod_id: [this.props.product.id, this.props.item.id], delivery: this.props.delivery});
    }

    render() {
        var total = parseFloat(this.props.item.price) + parseFloat(this.props.product.price) || 0;
        return <div className="row">
                                <div className="col-md-3">{this.props.item.name}</div>
                                <div className="col-md-3">{this.props.product.price} {this.props.product.currency_name}</div>
                                <div className="col-md-3">{total.toFixed(2)} {this.props.product.currency_name}</div>
                                <div className="col-md-3">
                                    <div className="btn btn-action" name={this.props.product.id} onClick={this.addApsell} data-dismiss="modal">Купить</div>
                                </div>
                                <div className="col-md-12">
                                    <hr/>
                                </div>
                            </div>
    }
}

class Upsells extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.hideModal = this.hideModal.bind(this);
        this.onClick = this.onClick.bind(this);
        this.addOrder = this.addOrder.bind(this);
    }

    hideModal(e) {
        ModalActions.hide();
    }

    onClick(e) {
        e.stopPropagation();
    }

    addApsell(e) {
        debugger
    }

    addOrder(e) {
        ModalActions.hide();
        OrderActions.add({prod_id: [this.props.data.product.id], delivery: this.props.data.delivery});
    }

    render() {
        var self = this;
        console.log('Upsellssssss', this.props)

        return  <div className="modal-content" onClick={this.onClick}>
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                        <h4 className="modal-title">У вас есть возможность купить этот товар по скидке с такими:</h4>
                      </div>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col-md-3">Товар</div>
                              <div className="col-md-3">Цена выбранного товара</div>
                              <div className="col-md-3">Цена за 2 товара</div>
                              <div className="col-md-3"></div>
                          </div>
                          <div className="row"><hr/></div>
                        {this.props.data.upsells.map((item, index) => {

                            return <UpsellItem key={index} item={item} product={self.props.data.product} delivery={self.props.data.delivery} />
                        })}
                          <div className="btn" data-dismiss="modal" onClick={this.addOrder}>Нет, спасибо</div>
                      </div>
                    </div>
    }
}

export default Upsells;