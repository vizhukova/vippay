import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import PromoAction from'./../../actions/PromoAction';
import NumberInput from'./../../../../../common/js/NumberInput';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import _  from 'lodash';

class CategoryForm extends React.Component {

    constructor(){
        super();
        this.state = PromoStore.getState();
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.add = this.add.bind(this);
        this.get = this.get.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        if(this.props.params.id) {
            this.get(this.props.params.id);
        } else {

        }

        PromoStore.listen(this.update);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id) {
            this.get(nextProps.params.id);
        } else {

        }
    }

    componentWillUnmount() {
        PromoStore.unlisten(this.update);
    }

    get(id) {

    }

    add() {

    }

    edit() {

    }

    onChange(e) {
        var state = {};
		state[e.target.name] =  e.target.value;
		_.assign(this.state.category, state);
        this.setState({});
    }

    onTypeChange(e) {
        this.state.type = e.target.value;
    }

    onClick(e) {
        AlertActions.hide();
    }

    onKeyDown(e) {
		if(e.keyCode == 13) {
            this.props.params.id  ? this.edit() : this.add();
            e.preventDefault();
        }
	}

    update(state){

    }

    render(){
        return  <div className="col-sm-7 form-ui boxed">
            <form className="">

              <fieldset className="form-group">
                  <label className="text-primary">
                      {this.props.params.id  ? "Редактировать промо акции" : "Новая промо акция"}
                  </label>
              </fieldset>

                <fieldset>
                    <label>Скидка</label>
                    <NumberInput name="discount" onChange={this.onChange}/>
                </fieldset>

                <fieldset>
                    <label>Тип</label>
                    <div class="checkbox">
                      <label>
                        <input type="radio" name="before" value={this.state.type == 'before'} onChange={this.onTypeChange}/>
                        Действителен (до)
                      </label>
                    </div>
                    <div class="checkbox">
                      <label>
                        <input type="radio" name="during" value={this.state.type == 'during'} onChange={this.onTypeChange} />
                       Действителен (дней)
                      </label>
                    </div>
                    {this.state.type == 'during' ? <div></div> : <div></div>}
                </fieldset>

                <button type="button" className="btn btn-default btn-submit pull-right"
                        onClick={this.props.params.id  ? this.edit : this.add}>{
                   this.props.params.id  ? "Редактировать" : "Добавить"}
                </button>
            </form>
        </div>

    }


}


export default CategoryForm;