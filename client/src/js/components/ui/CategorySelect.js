import React from 'react';


class CategorySelect extends React.Component {

    constructor(){
        super();
        this.state = {};
    }

    componentDidMount(){
        this.setState({
            current_category: this.props.current_category
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            current_category: props.current_category
        })
    }

    render(){
        var self = this;
        return  <select className="form-control" id="sell"  name="category_id"
                        value={this.state.current_category}
                        onChange={this.props.onChange}
                        onClick={this.props.onClick}>

                    { this.props.categories.map(function(item, index){
                        return <option
                            key={index}
                            value={item.id}
                        >{item.category}</option>
                        })}

                </select>
    }


}


export default CategorySelect;