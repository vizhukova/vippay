import React from 'react';


class CategorySelect extends React.Component {

    constructor(){
        super();
        this.state = {};
    }


    render(){
        var self = this;
        return  <select className="form-control" id="sell"  name="category_id"
                        value={this.props.current_category} onChange={this.props.onChange}>
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