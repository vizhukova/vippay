import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ModalActions  from './../../../../common/js/ModalWindow/ModalActions';
import _  from 'lodash';


class Message extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.hideModal = this.hideModal.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    hideModal(e) {
        ModalActions.hide();
    }

    onClick(e) {
        e.stopPropagation();
    }

    onContinue(e) {
        this.props.data.onContinue(this.props.data.forComponent);
    }

    render() {
        var self = this;

        return  <div className="modal-content" onClick={this.onClick}>
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                        <h4 className="modal-title">{this.props.data.title || 'Информация'}</h4>
                      </div>
                      <div className="modal-body row">

                              {this.props.data.messages.map((m, index) => {
                                  return <p key={index}>{m}</p>
                              })}

                          <div className={`col-md-12 ${this.onContinue ? '' : 'hidden'}`}>
                            <div className="btn pull-right"  onClick={this.onContinue}>Продолжить</div>
                        </div>
                      </div>
                    </div>
    }
}

export default Message;