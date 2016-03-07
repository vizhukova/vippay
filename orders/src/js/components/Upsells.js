import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ModalActions  from './../../../../common/js/ModalWindow/ModalActions';
import _  from 'lodash';


class Upsells extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.hideModal = this.hideModal.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    hideModal(e) {
        ModalActions.hide();
    }

    onClick(e) {
        e.stopPropagation();
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
                          <div>
                              <div className="col-md-4">Товар</div>
                              <div className="col-md-4">Цена выбранного товара</div>
                              <div className="col-md-4">Общая цена</div>
                              <hr />
                          </div>
                        {this.props.data.upsells.map((item, index) => {
                            return <div key={index}>
                                <div className="col-md-4">{item.name}</div>
                                <div className="col-md-4">{self.props.data.product.price} {self.props.data.product.currency_name}</div>
                                <div className="col-md-4">{item.price}</div>
                                   <hr />
                            </div>
                        })}
                      </div>
                    </div>
    }
}

export default Upsells;