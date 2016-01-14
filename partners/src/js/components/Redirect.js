import React from 'react';
import RedirectAction from './../actions/RedirectActions';
import RedirectStore from './../stores/RedirectStore';

class Redirect extends React.Component {

    constructor(){
        super();

        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        RedirectStore.listen(this.update);
    }

    update(state) {
        debugger
        if(state.link)  window.location=state.link;
    }

    onClick() {
        debugger
        RedirectAction.redirect(this.props.params);
    }


    render(){

        return <div>
            <button onClick={this.onClick}>Click to redirect</button>
            </div>

    }


}


export default Redirect;