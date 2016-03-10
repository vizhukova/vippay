import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import PromoStore from'./../../stores/PromoStore';
import PromoAction from'./../../actions/PromoAction';
import moment  from 'moment';
import _  from 'lodash';

class Item extends React.Component {

    constructor() {
        super();
        this.state={};
        this.type = {
            until: 'Действителен до',
            during: 'Действителен (продолжительность)'
        }
    }

    declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }


    render() {
        var baseClassDel = "btn pull-right btn-xs glyphicon glyphicon-remove btn-warning btn-action btn-danger";
        var baseClassEdit = "btn pull-right btn-xs glyphicon glyphicon-pencil btn-warning btn-action btn-default";
        var date;

        debugger

        if(this.props.item.type == 'until') {
            date = moment(this.props.item.date).format('DD.MM.YYYY HH:mm:ss');
        } else {
            var duration = moment.duration(moment(this.props.item.date).diff(moment()));

            var time;

            if(duration.days()) {
                time = duration.days() + ' дней';
            }
            else if(duration.hours()) {
                time = duration.hours() + ' часов';
            }
            else if(duration.minutes()) {
                time = duration.minutes() + ' минут';
            }
             else if(duration.seconds()) {
                time = duration.seconds() + ' секунд';
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
            </tr>
    }
}

export default Item;