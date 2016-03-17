import React from 'react';
import ReactDOM from 'react-dom';


var DateInput = React.createClass({

    getDefaultProps(){
        return {
            date: ''
        }
    },

    getInitialState(){
        return {
            date: this.props.default
        }
    },

    componentDidMount(){
        var self = this;
        var i = $( ReactDOM.findDOMNode(this)).find('input');


        $(i).datepicker({
            dateFormat: 'dd-mm-yyyy',
            onSelect: function(fd, date){
                var e = {
                    target: {}
                };

                e.target.name = 'date';
                e.target.value = {
                    day: date.getDate(),
                    month: (date.getMonth() + 1),
                    year: date.getFullYear()
                }

                self.props.onChange(e);
            }
        });
    },

    onChange(e){
        debugger;
        e.preventDefault();
        this.setState({date: this.props.default})

    },

    render(){

        return (
            <span>
                <input value={this.props.default}
                       className={this.props.selector}
                       onKeyPress={this.onChange}
                       type="text"
                       id="date"
                       disabled={this.props.disabled}
                       name="date"
                       placeholder="Дата"/>

            </span>
        )

    }

});

module.exports = DateInput;
