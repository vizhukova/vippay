import React from 'react';

class AddFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    /**componentDidMount(){
        this.setState({
            current_category: this.props.current_category
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            current_category: props.current_category
        })
    }*/

    onChange(e) {
        console.log(e.target.name + ' ' + e.target.value + ' ' + this.props.id);

        var state = {};
        state[e.target.name] = e.target.value;

        this.setState(state);
        this.props.onChange({id: this.props.id, delivery: this.state})
    }

    render(){
        var self = this;
        return   <div className="form-group">
                    <label>Даные доставки</label>
                    <input type='text' className="form-control" name="condition" onChange={this.onChange}/>
                    <label>Цена</label>
                    <input type='text' className="form-control" name="price" onChange={this.onChange}/>
                </div>
    }


}


export default AddFields;