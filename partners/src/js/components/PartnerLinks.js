import React from 'react';
import PartnerLinksActions from'./../actions/PartnerLinksActions';
import PartnerLinksStore from'./../stores/PartnerLinksStore';
import List from'./../../../../common/js/List';
import ModalActions from'./../../../../common/js/ModalWindow/ModalActions';

/**
 * Элемент списка партнерских ссылок
 */
class PartnerLink extends React.Component {

    constructor() {
        super();
        this.state = {
            commentLength: 50,
            isCommentCut: 0 // 0-не выводить Подробнее; 1- Подробнее раскрыт; -1 - ПОдробнее закрыт
        }
        this.setModelData = this.setModelData.bind(this);
        this.onClick = this.onClick.bind(this);
    }

     componentDidMount() {
        if (this.props.item.description && this.props.item.description.length > this.state.commentLength) {
            this.state.isCommentCut = -1;
            this.setState({});
        }
    }

    onClick(e) {
        e.preventDefault();
        this.state.commentLength = this.state.isCommentCut < 0 ? this.props.item.description.length
            : 50;
        this.state.isCommentCut *= -1;
        this.setState({});

    }

    setModelData(e) {
        var materials = this.props.item.materials || [];
        ModalActions.set({data: materials, name: 'Materials'});
    }

    render() {

        var comment = this.props.item.description || '';
        var materials = this.props.item.materials || [];

        if (comment.length > this.state.commentLength) {
            comment = comment.slice(0, this.state.commentLength);
        }

        return <tr>
            <td>{this.props.item.name}</td>
             <td>
                 {materials.length > 0
                    ? <button type="button" data-toggle="modal" data-target="#myModal" className="btn btn-default btn-action glyphicon glyphicon-eye-open" onClick={this.setModelData}/>
                    : '-'}
            </td>
            <td>{comment}
                {this.state.isCommentCut
                    ? <a href="" onClick={this.onClick}>{`${(this.state.isCommentCut > 0 ? 'Скрыть' : 'Подробнее')}`}</a>
                    : ''}
            </td>
            <td><a href={this.props.item.link}>{this.props.item.link}</a></td>
        </tr>
    }
}

/**
 * Список продуктов партнёра
 */
class PartnerLinks extends React.Component {

    constructor(){
        super();
        this.state = PartnerLinksStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        PartnerLinksStore.listen(this.update);
        PartnerLinksActions.get();
    }

    componentWillUnmount() {
        PartnerLinksStore.unlisten(this.update);
    }

    update(state) {
        console.log('STAAAATE', state)
        this.setState(state);
    }


    render(){

        return <List
            title="Партнерские ссылки"
            items={this.state.partner_links}
            itemComponent={PartnerLink}
            isPaginate={true}
            thead={[
                {name: 'Название', key: 'name'},
                {name: 'Дополнительные материалы', key: ''},
                {name: 'Описание', key: ''},
                {name: 'Ссылка', key: ''}
            ]}
            />

    }


}


export default PartnerLinks;
