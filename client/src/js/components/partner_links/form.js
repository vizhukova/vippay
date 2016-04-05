import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PartnerLinksStore from './../../stores/PartnerLinksStore';
import PartnerLinksAction from './../../actions/PartnerLinksAction';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import _  from 'lodash';


class AddMaterialFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){
         if(nextProps){
             this.setState(nextProps.materials);
         }
        console.log('AddMaterialFields', this.state)
    }

    onDel(e) {
        e.preventDefault();
        this.state = {};
        this.setState({});
        this.props.onDel({id: this.props.id});
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state, state);
        this.setState({});
        this.props.onChange({id: this.props.id, materials: this.state})
    }

    render(){
        var self = this;
        return   <div className="form-group">
                    <fieldset>
                        <button type="submit" className={`btn btn-danger btn-action glyphicon glyphicon-minus pull-right
                           `} onClick={this.onDel} />
                    </fieldset>
                    <fieldset>
                        <label>Название<span className="text-danger"> * </span></label>
                        <input type='text' className="form-control" name="name"
                               value={this.props.materials.name}
                               onChange={this.onChange}
                               onClick={this.props.onClick}/>

                        <label>Описание<span className="text-danger"> * </span></label>
                        <textarea type='text' className="form-control" name="description"
                               value={this.props.materials.description}
                               onChange={this.onChange}
                               onClick={this.props.onClick}/>
                    </fieldset>
                </div>
    }


}

class AddMaterials extends React.Component {

    constructor(){
        super();

          this.state = {
            materials: []
        };


        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.link.materials && nextProps.link.materials.length > 0) {
            _.assign(this.state, {materials: nextProps.link.materials});
        }
        console.log('AddForm2', this.state)
    }

    onChange(state) {
        _.assign(this.state.materials[state.id], state.materials);
        this.setState({});
        this.props.onChange({
                target: {
                    name: 'materials',
                    value: this.state.materials
                }
        });
    }

    onAdd(e) {
        e.preventDefault();
        var lastItem = this.state.materials[this.state.materials.length - 1];
        if( this.state.materials.length && (_.trim(lastItem.name).length == 0 || _.trim(lastItem.description).length == 0)) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Все поля материалов должны быть заполнены'
            }, true)
            return;
        }
        this.state.materials.push({name: '', description:''});
        this.setState({});
        this.props.onClick();
    }

    onDel(data) {
        this.state.materials = _.filter(this.state.materials, (item, index) => index != data.id);
        this.setState({});
        this.props.onClick();
        this.props.onChange({
                target: {
                    name: 'materials',
                    value: this.state.materials
                }
        });
    }

    render(){
        var self = this;
        console.log('AddForm render', this.state);

        return  <div role="form">
                  <div className="btn boxed" onClick={this.onAdd}>Добавить материалы</div>
                  { this.state.materials.map(function(item, index){
                    return  <div key={index}>
                                <AddMaterialFields id={index} materials={item}
                                           onChange={self.onChange}
                                           onClick={self.props.onClick}
                                           onDel={self.onDel}/>
                        <hr />
                        </div>
                    })}
                </div>
    }
}



class LinkForm extends React.Component {

    constructor(){
        super();
        this.state = PartnerLinksStore.getState();
        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.checkFields = this.checkFields.bind(this);

    }

    componentDidMount() {
        var self = this;
        console.log('PROOPS',this.props)

        if(!this.props.params.id) {

            this.setState({
                link: {
                active: true,
                description: '',
                materials: []
            }
            });

        } else {
            PartnerLinksAction.getCurrent(this.props.params.id);
        }

        console.log('ProductForm - componentDidMount', this.state.link)

        PartnerLinksStore.listen(this.update);
    }

    onKeyDown(e) {
        if(e.keyCode == 13) {
            this.props.params.prod_id ? this.edit() : this.add()
        }
    }

    componentWillUnmount() {
        PartnerLinksStore.unlisten(this.update);
    }

    checkFields() {
        var result;

        result = this.state.link.materials.filter((item) => {
            return _.trim(item.name).length == 0 || _.trim(item.description).length == 0
        });

        var reg = /[0-9a-zA-Z\-_]{4,10}/g;
        var regRes = reg.test(this.state.link.key);

        if(!regRes) return false;

        return !result.length && regRes && this.state.link.name
            && _.trim(this.state.link.name).length > 0 && this.state.link.link
            && _.trim(this.state.link.link).length > 0

    }

    add() {
        var self = this;
        if(this.checkFields()) {
            PartnerLinksAction.add(this.state.link).then(() => {
                history.back();

            })

        } else {
           AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных. Все обязательные поля должны быть заполнены.'
                }, true)
        }
    }

    edit() {
        var self = this;

        if(this.checkFields()) {
            PartnerLinksAction.set(this.state.link).then((data) => {
                history.back();

            })
        } else {
               AlertActions.set({
                            type: 'error',
                            title: 'Ошибка',
                            text: 'Проверьте правильность заполнения данных. Все обязательные поля должны быть заполнены.'
                    }, true)
            }
        }

    update(state){
        this.state = state;
        this.setState({});
    }

    onChange(e) {
        var state = {};
        if(e.target.name == "active")  state[e.target.name] =  e.target.checked;
		else state[e.target.name] =  e.target.value;
        _.assign(this.state.link, state);
        this.setState({});
    }


    onClick(e) {
        AlertActions.hide();
    }



    render(){
        var self = this;
        var edit = this.props.params.id;

         return <form className="col-sm-7 form-ui table-wrapper">
            <fieldset className="product-form">

                <label className="text-warning">{edit ? 'Название редактируемой ссылки' : 'Название новой ссылки'} <span className="text-danger"> * </span></label>
                <input type="text" name="name" id="name"
                       className="form-control"
                       onChange={this.onChange}
                       onClick = {this.onClick}
                       placeholder="Введите название"
                       value={this.state.link.name}
                       />

                <label className="text-warning">Ссылка <span className="text-danger"> * </span></label>
                <input type="text" name="link"
                       className="form-control" id="link"
                       onChange={this.onChange}
                       onClick = {this.onClick}
                       placeholder="Введите новую ссылку"
                       value ={this.state.link.link}
                       />


                <label className="text-warning">Код идентификации <span className="text-danger"> * </span></label>
                <input type="text" name="key" className="form-control" id="key"
                       onChange={this.onChange}
                       onClick = {this.onClick}
                       placeholder="Введите код идентификации"
                       value={this.state.link.key}
                       />
                <span className="text-warning small">(код идентификации должен быть уникальным и содержать латинские буквы, цифры, длина от 4 до 10 символов. По желанию может содержать : спец. символы тире(-) или нижнее подчеркивание(_) )</span>


                <div className="checkbox">
                  <label className="text-warning">
                      <input name="active"
                             checked={this.state.link.active}
                             type="checkbox"
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                      Активность</label>
                </div>


                <label className="text-warning">Описание:</label>
                <textarea className="form-control" id="description" name="description"
                          onChange={this.onChange}
                          onClick = {this.onClick}
                          value={this.state.link.description}
                           />
            </fieldset>

             <fieldset className="product-form">
                  <AddMaterials onChange={this.onChange}
                          onClick = {this.onClick}
                          link={this.state.link}
                         />
             </fieldset>

             <fieldset><div className="text-danger small">*Поля обязательные для заполнения</div></fieldset>


             <button type="button" className="btn btn-warning pull-left btn-submit" onClick={edit ? this.edit : this.add}>{
                edit ? "Редактировать" : "Добавить"}
            </button>

              <Link to={`/links`}>
                 <button type="button" className="btn btn-danger pull-right btn-submit">
                     {"Отмена"}
                 </button>
             </Link>
        </form>
    }
}

export default LinkForm;
