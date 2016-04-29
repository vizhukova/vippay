import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PartnerLinksStore from'./../../stores/PartnerLinksStore';
import PartnerLinksAction from'./../../actions/PartnerLinksAction';
import List from'./../../../../../common/js/List';
import ModalActions from'./../../../../../common/js/ModalWindow/ModalActions';
import _  from 'lodash';

/**
 * Список дополнительных партнёрских ссылок
 */
class LinkItem extends React.Component {

    constructor() {
        super();
        this.state = {
            commentLength: 50,
            isCommentCut: 0 // 0-не выводить Подробнее; 1- Подробнее раскрыт; -1 - ПОдробнее закрыт
        }
        this.update = this.update.bind(this);
        this.setActive = this.setActive.bind(this);
        this.remove = this.remove.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setModelData = this.setModelData.bind(this);
    }

    componentDidMount() {
        if (this.props.item.description && this.props.item.description.length > this.state.commentLength) {
            this.state.isCommentCut = -1;
            this.setState({});
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.item.description && this.props.item.description.length > this.state.commentLength) {
            this.state.isCommentCut = -1;
            this.setState({});
        }
    }

    update(state) {
        this.setState(state);
    }

    remove() {
        PartnerLinksAction.remove(this.props.item.id);
    }

    setActive() {
        var newLink = _.clone(this.props.item);
        newLink.active = !newLink.active;
        PartnerLinksAction.set(newLink);
    }

    onClick(e) {
        e.preventDefault();
        this.state.commentLength = this.state.isCommentCut < 0 ? this.props.item.description.length
            : 50;
        this.state.isCommentCut *= -1;
        this.setState({});

    }

    setModelData() {
        var materials = this.props.item.materials || [];
        ModalActions.set({data: materials, name: 'Materials'});
    }

    render() {
        var available = "glyphicon glyphicon-ok-circle btn btn-default btn-action";
        var notAvailable = "glyphicon glyphicon-ban-circle btn btn-danger btn-action";

        //console.log(this.state.isCommentCut)

        var comment = this.props.item.description || '';
        var materials = this.props.item.materials || [];

        if (comment.length > this.state.commentLength) {
            comment = comment.slice(0, this.state.commentLength);
        }

        return <tr>
            <td>{this.props.item.name}</td>
            <td><a href={this.props.item.link}>{this.props.item.link}</a></td>
            <td>{this.props.item.key}</td>
            <td>
                { materials.length > 0
                    ? <button type="button" data-toggle="modal" data-target="#myModal"
                              className="btn btn-default btn-action glyphicon glyphicon-eye-open"
                              onClick={this.setModelData}/>
                    : '-' }
            </td>
            <td className="action">
                <button type="button" className={this.props.item.active ? available : notAvailable}
                        onClick={this.setActive}/>
            </td>
            <td>{comment}
                {this.state.isCommentCut
                    ?
                    <a href="" onClick={this.onClick}>{`${(this.state.isCommentCut > 0 ? 'Скрыть' : 'Подробнее')}`}</a>
                    : ''}
            </td>
            <td className="action">
                <Link to={`/partners_links/${this.props.item.id}`}
                      className={`btn btn-default btn-action glyphicon glyphicon-pencil
                              ${this.props.isActiveTariff ? '' : 'disabled'}`}/>
                <button type="button" className={`btn btn-danger btn-action pull-right glyphicon glyphicon-remove
                        ${this.props.isActiveTariff ? '' : 'disabled'}`} onClick={this.remove}/>
            </td>
        </tr>
    }


}

class Links extends React.Component {

    constructor() {
        super();
        this.state = PartnerLinksStore.getState();
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        PartnerLinksAction.get();
        PartnerLinksStore.listen(this.update);
    }

    componentWillUnmount() {
        PartnerLinksStore.unlisten(this.update);
    }

    update(state) {
        this.setState(state);
    }


    render() {

        return <List
            title="Партнерские ссылки"
            add_link={`/partners_links/new`}
            add_link_name='Добавить ссылку'
            items={this.state.links}
            itemComponent={LinkItem}
            isPaginate={true}
            thead={[
                {name: 'Название', key: 'name'},
                {name: 'Ссылка', key: 'link'},
                {name: 'Уникальный идентификатор', key: 'key'},
                {name: 'Дополнительные материалы', key: ''},
                {name: 'Активность', key: 'active'},
                {name: 'Описание', key: 'description'},
                {name: '', key: ''}
            ]}
        />
    }
}

export default Links;