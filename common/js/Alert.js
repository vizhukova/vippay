import React from 'react';


class Alert extends React.Component {

    constructor(){
        super();
        this.state = {
            visible: false
        };

        this.hide = this.hide.bind(this);

    }

    hide(e){
        e.preventDefault();
        this.setState({visible: false})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type) this.setState({visible: true});
        else this.setState({visible: false});
    }

    render(){
        console.log('Alert this.props', this.props)
        return <div onClick={this.hide} className={`alert boxed alert-${this.props.type} ${this.state.visible ? '' : 'hide'}`}>
            <div className="alert-body">
                <span>{this.props.title}</span>
                <p>{this.props.text}</p>
            </div>
            <span className="alert-label" />
            <a href="#" className="close" />
        </div>


    }


}


export default Alert;