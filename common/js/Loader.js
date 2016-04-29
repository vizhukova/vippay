import React from 'react';

/**
 * Индикатор загрузки
 */
class Loader extends React.Component {

    constructor(){
        super();
    }


    render(){
        return <div className="overlay-loader">
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>


    }


}


export default Loader;