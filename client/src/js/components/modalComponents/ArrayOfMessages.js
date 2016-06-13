import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ModalActions  from './../../../../../common/js/ModalWindow/ModalActions';
import _  from 'lodash';

/**
 * Компонент для отображения массива сообщений
 */
class ArrayOfMessages extends React.Component {
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

        return <div className="modal-content" onClick={this.onClick}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                <h4 className="modal-title">{this.props.data.title}</h4>
            </div>
            <div className="modal-body">
                {this.props.data.array.map((item, index) => {
                    return <div key={index}>
                        <p>{item}</p>
                        {index < self.props.data.array.length - 1 ? <hr /> : null}
                    </div>
                })}
            </div>
        </div>
    }
}

export default ArrayOfMessages;