import React from 'react';
import Orders from './Orders';


class Home extends React.Component {

    constructor(){
        super();
        this.state = {};
    }


    render(){

        return <div>
            <Orders isPaginate={false} />
        </div>

    }


}


export default Home;