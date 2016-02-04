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
    }

    render(){

        return <div onClick={this.hide} className={`alert boxed alert-${this.props.type}`}>
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