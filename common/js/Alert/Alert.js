import React from 'react';
import AlertStore from './AlertStore';
import SettingsAction from './../../../client/src/js/actions/SettingsAction';
import AlertActions from './AlertActions';

/**
 * Компонент уведомления
 */
class AlertItem extends React.Component {
    
    constructor() {
        super();
        this.state={};
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
         if(this.props.item.isAutoHide) this.idTimeout = setTimeout(()=> {
                                                            console.log('autoDelete');
                                                            AlertActions.hide(this.props.item);
                                                        }, 7000);
    }

    componentWillUnmount() {
         if(this.idTimeout) clearTimeout(this.idTimeout);
    }

    hide(e) {
        e.preventDefault();
        if(this.idTimeout) clearTimeout(this.idTimeout);

        if(this.props.item.id) SettingsAction.setMessage({id: this.props.item.id, data: {delivered: true}});
        else {
            this.props.hide(this.props.id);
        }
    }
    
    render() {
        return <div onClick={this.hide}
                    className={`alert boxed alert-${this.props.item.type} `}>
            <div className="alert-body">
                <span>{this.props.item.title}</span>
                <p>{this.props.item.text}</p>
            </div>
            <span className="alert-label"/>
            <a href="#" className="close"/>
        </div>
    }
}

/**
 * Список уведомлений
 */
class Alert extends React.Component {

    constructor(){
        super();
        this.state = AlertStore.getState();
        this.hide = this.hide.bind(this);
        this.update = this.update.bind(this);

    }

    componentDidMount() {
        AlertStore.listen(this.update)
    }

    componentWillUnmount() {
        AlertStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    hide(id){
        AlertActions.hide(id);
    }

    componentWillReceiveProps(nextProps) {

    }

    render(){
        var self = this;
        return <div>
            {this.state.messages.map((item, index) => {
                return <AlertItem key={index} item={item} hide={this.hide} id={index} />
            })}
        </div>


    }


}


export default Alert;