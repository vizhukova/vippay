var React = require('react');
var $ = require('jquery');


var DateInput = React.createClass({

    getDefaultProps(){
        return {
            birthday: ''
        }
    },

    getInitialState(){
        return {
            date: this.props.default
        }
    },

    componentDidMount(){
        var self = this;
        $(this.getDOMNode()).find('input').datepicker({
            dateFormat: 'dd-mm-yyyy',
            onSelect: function(fd, date){
                var e = {
                    target: {}
                };

                e.target.name = 'birthday';
                e.target.value = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

                self.props.cb(e);
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
                       disabled={this.props.disabled}
                       name="birthday"
                       placeholder="Дата рождения"/>

            </span>
        )

    }

});

module.exports = DateInput;
