import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import ProductsStore from'./../../stores/ProductsStore';
import ProductsAction from'./../../actions/ProductsAction';
import CategoriesStore from'./../../stores/CategoriesStore';
import CategoriesAction from'./../../actions/CategoriesAction';
import SettingsStore from'./../../stores/SettingsStore';
import CategorySelect from'./../ui/CategorySelect';
import CurrencySelect from'./../ui/CurrencySelect';
import Alert from './../../../../../common/js/Alert/Alert';
import NumberInput from './../../../../../common/js/NumberInput';
import Select from './../../../../../common/js/Select';
import AlertActions from './../../../../../common/js/Alert/AlertActions';
import _  from 'lodash';

/**
 * Информация о доставке
 */
class AddDeliveryFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){

         if(nextProps){
             this.setState(nextProps.item);
         }
    }

    componentDidMount(){

         if(this.props.item){
             this.setState(this.props.item);
         }
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state, state);
        this.setState({});
       // this.setState(state);
        this.props.onChange({id: this.props.id, item: this.state})
    }

    onDel(e) {
        e.preventDefault();
        this.props.onDel({id: this.props.id});
    }

    render(){
        var self = this;

        return   <div className="form-group">
                    <fieldset>
                        <button type="submit" className={`btn btn-danger btn-action glyphicon glyphicon-minus pull-right
                           `} onClick={this.onDel} />
                    </fieldset>
                    <fieldset>
                        <label>Даные доставки<span className="text-danger"> * </span></label>
                        <input type='text' className="form-control" name="condition"
                               value={this.state.condition}
                               onChange={this.onChange}
                               onClick={this.props.onClick}
                               onKeyDown={this.props.onKeyDown}/>

                        <label>Цена<span className="text-danger"> * </span></label>
                        <NumberInput type='text' className="form-control" name="price"
                               value={this.state.price}
                               onChange={this.onChange}
                               onClick={this.props.onClick}
                               onKeyDown={this.props.onKeyDown}
                               toFixed={2}/>
                    </fieldset>
                </div>
    }
}

/**
 * Дополнительные материалы
 */
class AddMaterialFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){
         if(nextProps){
             this.setState(nextProps.item);
         }
    }

    onChange(e) {
        var state = {};
        state[e.target.name] = e.target.value;
        _.assign(this.state, state);
        this.setState({});
        this.props.onChange({id: this.props.id, item: this.state})
    }
    onDel(e) {
         e.preventDefault();
        this.state = {};
        this.setState({});
        this.props.onDel({id: this.props.id});
    }


    render(){
        var self = this;
        
        return   <div>
                    <fieldset>
                        <button type="submit" className={`btn btn-danger btn-action glyphicon glyphicon-minus pull-right
                           `} onClick={this.onDel} />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Название<span className="text-danger"> * </span></label>
                        <input type='text' className="form-control" name="name"
                               value={this.props.item.name}
                               onChange={this.onChange}
                               onClick={this.props.onClick}
                               onKeyDown={this.props.onKeyDown}/>

                        <label>Описание<span className="text-danger"> * </span></label>
                        <textarea type='text' className="form-control" name="description"
                               value={this.props.item.description}
                               onChange={this.onChange}
                               onClick={this.props.onClick}
                               onKeyDown={this.props.onKeyDown}/>
                </fieldset>
            </div>
    }


}

/**
 * Настройка апселов
 */
class AddUpsellFields extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.upsellProducts = [];

        this.onChange = this.onChange.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if(! nextProps.item.product_id) nextProps.item.product_id = this.upsellProducts[0].id;

         if(nextProps){
             this.setState(nextProps.item);
         }
    }

    componentDidMount(){

         if(this.props.item){
             this.setState(this.props.item);
         }

        ProductsAction.getProductsForUpsell().then((u_p) => {
            this.upsellProducts = u_p;
            this.setState({});
        });
    }

    onChange(e) {
        var state = {};

        if(e.target.name == 'name')state.product_id = e.target.value;
        else state[e.target.name] = e.target.value;
        
        _.assign(this.state, state);
        this.setState({});
       // this.setState(state);
        this.props.onChange({id: this.props.id, item: this.state})
    }

    onDel(e) {
        e.preventDefault();
        this.props.onDel({id: this.props.id});
    }

    render(){
        var self = this;
        
        return   <fieldset>
                    <div className="col-md-7">
                        <Select values={this.upsellProducts}
                        current_value={this.state.product_id}
                        fields={{
                            name: 'name',
                            value: 'id'
                        }}
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="col-md-4">
                         <NumberInput type="text" name="price"
                           className="form-control" id="price"
                           onChange={this.onChange}
                           onKeyDown={this.onKeyDown}
                           onClick = {this.onClick} placeholder="Цена набора"
                           value={this.state.price}
                           toFixed={2}/>
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className={`btn btn-danger btn-action glyphicon glyphicon-minus pull-right
                                 `} onClick={this.onDel} />
                    </div>
                </fieldset>
    }
}

/**
 * Компонент списка методов доставки/апселов/материалов
 */
class AddItems extends React.Component {

    constructor(){
        super();

          this.state = {
            items: []
        };


        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDel = this.onDel.bind(this);
    }

    componentDidMount(){
        
        if(this.props.items) {
            _.assign(this.state, {items: this.props.items});
            this.setState({});
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.items) {
            _.assign(this.state, {items: nextProps.items});
            this.setState({});
        }
    }

    onChange(state) {
        _.assign(this.state.items[state.id], state.item);
        this.setState({});
        this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.state.items
                }
        });
        
    }

    onAdd(e) {
        e.preventDefault();
        var lastItem = this.state.items[this.state.items.length - 1];
        var result = this.state.items.length ?
            _.filter(this.props.fields, (item, index) => ! _.trim(lastItem[item]).length)
            : null;
        
        if( this.state.items.length && result.length) {
            AlertActions.set({
                type: 'error',
                title: 'Ошибка',
                text: 'Все обязательные поля должны быть заполнены перед добавлением новых полей.'
            }, true);
            return;
        }

        if(this.props.default) {

             this.state.items.push(this.props.default);

        } else {

            var newObj = {};
            _.map(this.props.fields, (item) => newObj[item] = '');
            this.state.items.push(newObj);

        }

        this.setState({});
        this.props.onClick();
    }

    onDel(data) {
        if(this.state.items.length <= this.props.min_length) return;
        this.state.items = _.filter(this.state.items, (item, index) => index != data.id);
        this.setState({});
        this.props.onClick();
        this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.state.items
                }
        });
    }

    render(){
        var self = this;
        var ItemComponent = this.props.fieldsComponent;
        //console.log('AddForm render', this.state);

        return  <div role="form">
                  {this.props.isTitlePlus
                      ?  <div className="btn boxed" onClick={this.onAdd}>{this.props.title}</div>
                      :  <span>{this.props.title}</span>}
                  { this.state.items.map(function(item, index){

                      return  <div key={index}>
                                <ItemComponent id={index} item={item}
                                           onChange={self.onChange}
                                           onKeyDown={self.props.onKeyDown}
                                           onClick={self.props.onClick}
                                           onDel={self.onDel}/>
                        <hr />
                        </div>

                    })}
                  {this.props.isButtonPlus
                  ? <button type="submit" className="btn btn-success glyphicon glyphicon-plus pull-left" onClick={this.onAdd} />
                  : null}
                </div>
    }
}

/**
 * Форма создания/редактирования продукта
 */
class ProductForm extends React.Component {

    constructor(){
        super();
        this.state = CategoriesStore.getState();
        _.assign(this.state, ProductsStore.getState(), SettingsStore.getState());
        this.update = this.update.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    componentDidMount() {
        var self = this;
        if(!this.props.params.prod_id) {
            setTimeout(() => {
                ProductsAction.setStateProduct({category_id: this.props.params.id});
            }, 0);
        } else {
            ProductsAction.getCurrentProduct(this.props.params.prod_id);
        }

        ProductsAction.getProductsForUpsell();

        CategoriesStore.listen(this.update);
        ProductsStore.listen(this.update);
        SettingsStore.listen(this.update);
        CategoriesAction.getAllCategories();
    }

    onKeyDown(e) {
        if(e.keyCode == 13) {// если пользователь нажал на Enter
            this.props.params.prod_id ? this.editProduct() : this.addNewProduct()
        }
    }

    componentWillUnmount() {
        CategoriesStore.unlisten(this.update);
        ProductsStore.unlisten(this.update);
        SettingsStore.unlisten(this.update);

        ProductsAction.clear();
    }


    /**
     * Валидация
     * @returns {*}
     */
    checkFields() {
        var result;
        var self = this;

        if (this.state.product.material) {  //если продукт материальный(доставляемый)

            this.state.product.link_download = '';

            if (!this.state.product.delivery) return false; //если нет ни одной записи о доставке (адрес, цена)

            result = this.state.product.delivery.filter((item, index) => {

                var uniqueArr = _.uniq(self.state.product.delivery, function(d) { //проверка на уникальность записи о доставке в этом продукте
                      return d.condition;
                    }, Math);

                var isUnique = uniqueArr.length === this.state.product.delivery.length;

                return !isUnique || !_.trim(item.condition).length || !_.trim(item.price).length;//проверка на уникальность всех записей доставки в товаре, на отсутствие пустых полей

            });
            result = result.length > 0;
            if(result) return false;
        } else {//проверка на то, что поле ссылки скачивания не пустое
            this.state.product.delivery = [];
            result = !this.state.product.link_download || _.trim(this.state.product.link_download).length == 0;
            if (result) return false;
        }


        if(this.state.product.materials) {//валидация материалов продукта
            result = this.state.product.materials.filter((item) => {
                return _.trim(item.name).length == 0 || _.trim(item.description).length == 0
            });
            if (result.length) return false;
        }

        if(this.state.product.upsells) {//валидация апселов продукта
            result = this.state.product.upsells.filter((item) => {
                return ! _.trim(item.price).length || ! _.trim(item.product_id).length;
            });
            if ((this.state.product.isUpsell && !this.state.product.upsells.length) || result.length) return false;
        }


        return this.state.product.name && this.state.product.product_link &&
            this.state.product.price && _.trim(this.state.product.name).length > 0
            && _.trim(this.state.product.product_link).length > 0 && _.trim(this.state.product.price).length > 0

    }

    addNewProduct() {
        var self = this;
        if(this.checkFields()) {

            ProductsAction.addNewProduct(this.state.product).then(() => {
                history.back();

            })

        } else {
           AlertActions.set({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Проверьте правильность заполнения данных.'
                }, true)
        }
    }

    editProduct() {
        var self = this;

        if(this.checkFields()) {
            ProductsAction.editProduct(this.state.product).then((data) => {
                history.back();

            })
        } else {
               AlertActions.set({
                            type: 'error',
                            title: 'Ошибка',
                            text: 'Проверьте правильность заполнения данных.'
                    }, true)
            }
        }

    update(state){
        if(state.product) _.assign(this.state.product, state.product);
        _.assign(this.state, _.omit(state, ['product']));
        this.setState({});
    }

    onChange(e) {
        
        var state = {};
        if(e.target.name == "available")  state[e.target.name] =  e.target.checked;
        else if(e.target.name == "active")  state[e.target.name] =  e.target.checked;
        else if(e.target.name == "material")  {
            state[e.target.name] =  e.target.checked;
            if(e.target.checked) {
                this.state.product.delivery = [{condition: '', price: ''}];
            }
        }
        else if(e.target.name == "isUpsell")  {

            ProductsAction.setStateProduct({
                upsell_id:  this.state.product.upsell_id ? null : this.state.upsell_products[0].id,
                upsells: this.state.product.upsell_id ? [] : [{product_id: this.state.upsell_products[0].id, price: ''}]

            });

            state[e.target.name] =  e.target.checked;
        }
		else state[e.target.name] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
        
    }

    onChangeCurrency(e) {
        var state = {};
        state['currency_id'] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }

    onChangeCategory(e) {
        var state = {};
        state['category_id'] =  e.target.value;
        _.assign(this.state.product, state);
        this.setState({});
    }


    onClick(e) {
        AlertActions.hide();
    }



    render(){
        var self = this;
        var edit = this.props.params.prod_id;
        if(!this.state.product.currency_id) this.state.product.currency_id = this.state.basicCurrency;
        var isEdit = !!this.props.params.id;

         return <form className="col-sm-7 form-ui table-wrapper">

            <fieldset className="product-form">
                <label className="text-warning">{edit ? 'Редактируемый продукт' : 'Новый продукт'} <span className="text-danger"> * </span></label>
                <input type="text" name="name"
                       className="form-control" id="name"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick} placeholder="Введите название нового продукта"
                       value={this.state.product.name}/>
                </fieldset>

                <fieldset className="product-form">
                <label className="text-warning">Цена  <span className="text-danger"> * </span></label>
                <NumberInput type="text" name="price"
                       className="form-control input-lg" id="price"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick} placeholder="Введите цену"
                       value={this.state.product.price}
                       toFixed={2} />
                </fieldset>

                 <fieldset className="product-form">
                 <label className="text-warning">Валюта</label>
                 <Select values={this.state.currencies}
                    current_value={this.state.product.currency_id}
                    fields={{
                        name: 'name',
                        value: 'id'
                    }}
                    onChange={this.onChangeCurrency}
                 />
                 </fieldset>

                <fieldset className="product-form">
                <label className="text-warning">Категория</label>
                <Select values={this.state.categories}
                    current_value={this.state.product.category_id}
                    fields={{
                        name: 'category',
                        value: 'id'
                    }}
                    onChange={this.onChangeCategory}
                 />
                </fieldset>

                <fieldset className="product-form">
                <div className="checkbox">
                  <label className="text-warning">
                      <input name="available"
                         checked={this.state.product.available} type="checkbox"
                         onChange={this.onChange}
                         onClick = {this.onClick}/>
                      Доступность</label>
                </div>
                </fieldset>

                <fieldset className="product-form">
                <div className="checkbox">
                  <label className="text-warning">
                      <input name="active"
                             checked={this.state.product.active}
                             type="checkbox"
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                      Активность</label>
                </div>
                </fieldset>

                <fieldset className="product-form">
                <label className="text-warning">Ссылка на картинку</label>
                <input type="text" name="image" className="form-control" id="image"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick}
                       placeholder="Введите ссылку на картинку"
                       value={this.state.product.image}/>
                </fieldset>

                <fieldset className="product-form">
                <label className="text-warning">Ссылка на продукт <span className="text-danger"> * </span></label>
                <input type="text" name="product_link" className="form-control" id="product_link"
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onClick = {this.onClick}
                       placeholder="Введите ссылку на продукт"
                       value={this.state.product.product_link}/>
                </fieldset>

                <fieldset className="product-form">
                <label className="text-warning">Описание:</label>
                <textarea className="form-control" id="description" name="description"
                          onChange={this.onChange}
                          onKeyDown={this.onKeyDown}
                          onClick = {this.onClick}
                          value={this.state.product.description} />
                </fieldset>

                <fieldset className={`product-form boxed ${this.state.upsellFormState == 'hide' || this.state.isBusinessTariff
                    ? 'hide': ''}`}
                          disabled={this.state.upsellFormState == 'disable'} >
                    <label className="text-warning">
                       <input name="isUpsell"
                             checked={this.state.product.isUpsell}
                             type="checkbox"
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                        {`  Акция (1 + 1)`}
                     </label>

                    {this.state.product.upsell_id  ?
                        <AddItems onChange={this.onChange}
                          onClick = {this.onClick}
                          onKeyDown={this.onKeyDown}
                          items={this.state.product.upsells}
                          name="upsells"
                          min_length={1}
                          fields={['product_id', 'price']}
                          default={{
                            product_id: this.state.upsell_products[0].id,
                            price: ''
                          }}
                          title=""
                          fieldsComponent={AddUpsellFields}
                          isButtonPlus={true}
                          isTitlePlus={false} />
                            : null}
                 </fieldset>

                <fieldset className={`product-form ${this.state.product.material ? 'boxed' : ''}`}>
                <div className="checkbox">
                  <label className="text-warning">
                      <input name="material"  type="checkbox"
                             checked={this.state.product.material}
                             onChange={this.onChange}
                             onClick = {this.onClick}/>
                      Доставляемый { this.state.product.material  ? '(данные о доставке не должны повторяться)' : ''}</label>
                </div>

                {this.state.product.material
                    ?<AddItems onChange={this.onChange}
                          onClick = {this.onClick}
                          onKeyDown={this.onKeyDown}
                          items={this.state.product.delivery}
                          name="delivery"
                          min_length={1}
                          fields={['condition', 'price']}
                          title=""
                          fieldsComponent={AddDeliveryFields}
                          isButtonPlus={true}
                          isTitlePlus={false} />
                    : <div>
                    <label className="text-warning">Ссылка на скачивание продукта<span className="text-danger"> * </span></label>
                    <input type="text" name="link_download" className="form-control" id="link_download"
                           onChange={this.onChange}
                           onKeyDown={this.onKeyDown}
                           onClick = {this.onClick}
                           placeholder="Введите ссылку на скачивание продукта"
                           value={this.state.product.link_download}/>
                </div>}

                </fieldset>

             <fieldset className="product-form boxed">
                  <AddItems onChange={this.onChange}
                          onClick = {this.onClick}
                          onKeyDown={this.onKeyDown}
                          items={this.state.product.materials}
                          name="materials"
                          min_length={0}
                          fields={['name', 'description']}
                          title="Добавить материалы"
                          fieldsComponent={AddMaterialFields}
                          isButtonPlus={false}
                          isTitlePlus={true} />
             </fieldset>

             <fieldset><div className="text-danger small">*Поля обязательные для заполнения</div></fieldset>


             <button type="button" className="btn btn-warning pull-left btn-submit" onClick={edit ? this.editProduct : this.addNewProduct}>{
                edit ? "Редактировать" : "Добавить"}
            </button>

              <Link to={`/category/${this.props.params.id}/products`}>
                 <button type="button" className="btn btn-danger pull-right btn-submit">
                     {"Отмена"}
                 </button>
             </Link>
        </form>
    }
}

export default ProductForm;
