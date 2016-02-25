import React from 'react';
import Statistics from './Statistics';
import Orders from './Orders';


class Home extends React.Component {

    constructor(){
        super();
        this.state = {};
    }


    render(){

        return <div>
            <Statistics />
            <Orders  isPaginate={false} />
        </div>


    }


}


export default Home;