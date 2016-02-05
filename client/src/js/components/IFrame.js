import React from 'react';

class IFrame extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount() {
        var component = this.refs.iframe;
        component.addEventListener('load', this.props.onLoad);
    }

    render(){

        return  <iframe ref="iframe" style={{display: 'none'}} src={this.props.src}></iframe>

    }

}


export default IFrame;