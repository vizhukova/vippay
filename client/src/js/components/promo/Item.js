import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import PromoAction from'./../../actions/PromoAction';
import moment  from 'moment';
import _  from 'lodash';

/**
 * Элемент промоакции
 */
class Item extends React.Component {

    constructor() {
        super();
        this.state={};
        this.type = {
            until: 'Действителен до',
            during: 'Действителен (продолжительность)'
        }

        this.delete = this.delete.bind(this);
    }

    declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number % 100 > 4 && number % 100 < 20)
            ? 2
            : cases[ (number % 10 < 5) ? number % 10 : 5] ];
    }

    delete() {
        PromoAction.delete({id: this.props.item.id});
    }


    render() {
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove btn-warning btn-action btn-danger";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil btn-warning btn-action btn-default";
        var date;

        if(this.props.item.type == 'until') {
            date = moment(this.props.item.date).diff(moment()) > 0
                ? moment(this.props.item.date).format('DD.MM.YYYY HH:mm:ss')
                : 'Закончилась';
        } else {
            var duration = moment(this.props.item.date);

            var time;
            var today = moment();

            if(duration.diff(today, 'days') > 0) {
                time = duration.diff(today, 'days') + ' ' + this.declOfNum( duration.diff(today, 'days'), ['день', 'дня', 'дней'] );
            }
            else if(duration.diff(today, 'hours') > 0) {
                time = duration.diff(today, 'hours') + ' ' + this.declOfNum( duration.diff(today, 'hours'), ['час', 'часа', 'часов'] );
            }
            else if(duration.diff(today, 'minutes') > 0) {
                time = duration.diff(today, 'minutes') + ' ' + this.declOfNum( duration.diff(today, 'minutes'), ['минута', 'минуты', 'минут'] );
            }
             else if(duration.diff(today, 'seconds') > 0) {
                time = duration.diff(today, 'seconds') + ' ' + this.declOfNum( duration.diff(today, 'seconds'), ['секунда', 'секунды', 'секунды'] );
            }
            else {
                time = 0;
            }
            date = !time ? 'Закончилась' : `Осталось ${time}` ;
        }

        return <tr>
                <td>{this.props.item.code}</td>
                <td>{this.props.item.discount}%</td>
                <td>{date}</td>
                <td>{this.type[this.props.item.type]}</td>
                <td className="actions">
                    <div className={`${baseClassDel}`} onClick={this.delete} ></div>

                    <Link to={`/promo/${this.props.item.id}`} >
                        <div  className={`${baseClassEdit }`}> </div>
                    </Link>

                </td>
            </tr>
    }
}

export default Item;