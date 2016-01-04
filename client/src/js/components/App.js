import React from 'react'

import  AuthActions from '../actions/AuthActions';
import AuthStore from './../stores/AuthStore';

class Application extends React.Component {

    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
         var self = this;
        AuthStore.listen(this.update)
        AuthActions.check();

    }



    update(state){
        if(!state.auth){
            location.hash = 'auth';
        }else{
           this.setState(state);
        }
    }

    render() {
        return <div>
            Тест
        </div>
    }
}

export default Application;