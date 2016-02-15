import React from 'react';
import AlertStore from './AlertStore';


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

    hide(e){
        e.preventDefault();
        this.setState({show: false})
    }

    componentWillReceiveProps(nextProps) {

    }

    render(){
        console.log('Alert this.state', this.state)
        return <div onClick={this.hide} className={`alert boxed alert-${this.state.message.type} ${this.state.show ? '' : 'hide'}`}>
            <div className="alert-body">
                <span>{this.state.message.title}</span>
                <p>{this.state.message.text}</p>
            </div>
            <span className="alert-label" />
            <a href="#" className="close" />
        </div>


    }


}


export default Alert;