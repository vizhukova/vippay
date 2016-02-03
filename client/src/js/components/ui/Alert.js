import React from 'react';


class Alert extends React.Component {

    constructor(){
        super();
        this.state = {
            visible: false
        };

        this.onChange = this.onChange.bind(this);

    }

    onChange(e){
        var re = /[a-zA-Z0-9_-]+$/g;
        var value = e.target.value;

        if(re.test(value) || value === ''){
            this.setState({
                value: value
            });

            this.props.onChange({
                target: {
                    value: value,
                    name: 'login'
                }
            })
        }

    }

    render(){

        return <div className="alert boxed">

        </div>


    }


}


export default Alert;