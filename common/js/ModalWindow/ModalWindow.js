import React from 'react';
import ModalActions from './ModalActions';
import ModalStore from './ModalStore';
import { Router, Route, IndexRoute, Link } from 'react-router';
import _  from 'lodash';

import Materials from './../../../client/src/js/components/Materials';


/**
 * Компонент модального окна
 */
class ModalWindow extends React.Component {

    constructor() {
        super();
        this.components = {
            'Materials': Materials
        }
        this.state = ModalStore.getState();
        this.update = this.update.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }


    hideModal(e) {
        ModalActions.hide();
    }

    componentDidMount() {
        ModalStore.listen(this.update);
    }

    update(state) {
        this.setState(state);
    }

    render() {
        var Content = this.components[this.state.componentName] || null;

        return <div id="myModal" className={`modal fade ${this.state.isHide ? 'hide' : ''}`} role="dialog" onClick={this.hideModal}>
                  <div className="modal-dialog">
                        {Content ? <Content data={this.state.data}/> : null}
                  </div>
                </div>



    }


}

export default ModalWindow;

