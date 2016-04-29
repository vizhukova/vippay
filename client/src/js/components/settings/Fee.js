import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import NumberInput from'./../../../../../common/js/NumberInput';
import AlertActions from'./../../../../../common/js/Alert/AlertActions';
import _ from 'lodash';

/**
 * Настройка комиссии
 */
class Fee extends React.Component {

    constructor(){
        super();
        this.state = SettingsStore.getState();

        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        SettingsAction.getFee();
        SettingsStore.listen(this.update)
    }

    componentWillUnmount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    onChange(e) {
        this.state[e.target.name] = e.target.value;
        this.setState({})
    }

    save(e) {
        e.preventDefault();

        SettingsAction.editFee(this.state.fee).then((res) => {
            AlertActions.set({
                type: 'success',
                text: 'Новая сумма комиссии успешно установлена',
                title: 'Успех'
            }, true)
        })
    }


    render(){
        var self = this;
        return <div className="boxed">
            <form  onSubmit={this.save}>
                <div className="form-group">
                    <label>Комиссия:</label>
                    <NumberInput value={this.state.fee} name="fee" onChange={this.onChange} toFixed={2}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Сохранить" />
            </form>
        </div>


    }


}


export default Fee;