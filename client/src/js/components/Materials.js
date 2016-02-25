import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ModalActions  from './../../../../common/js/ModalWindow/ModalActions';
import _  from 'lodash';


class Materials extends React.Component {
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

        return  <div className="modal-content" onClick={this.onClick}>
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                        <h4 className="modal-title">Дополнительные материалы</h4>
                      </div>
                      <div className="modal-body">
                        {this.props.data.map((item, index) => {
                            return <div key={index}>
                               <p><b>{item.name}</b></p>
                               <p><b>Описание:</b>{item.description}</p>
                                    {index < self.props.data.length - 1 ? <hr /> : null}
                            </div>
                        })}
                      </div>
                    </div>
    }
}

export default Materials;