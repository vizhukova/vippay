import alt from '../alt';
import SettingsAction from './../actions/SettingsAction';
var _ = require('lodash');
var moment = require('moment');

class StaffStore {

    constructor() {
        this.staffs = [];
        this.staff = {active: true};
        this.routeNames = [

            {name: 'Каталог',
             route: 'catalog'},

            {name: 'Партнеры',
             route: 'partner'},

            {name: 'Партнерские ссылки',
             route: 'partner_links'},

            {name: 'Заказы',
             route: 'order'},

            {name: 'Курсы валют',
             route: 'rate'},

            {name: 'Комиссия',
             route: 'fee'},

            {name: 'Платежи',
             route: 'payments'}
        ];
        this.routes = [];

        this.onClear();

        this.bindListeners({
            onGetStaffs: SettingsAction.GET_STAFFS,
            onSetStaff: SettingsAction.SET_STAFF,
            onSetStaffActive: SettingsAction.SET_STAFF_ACTIVE,
            onaAddStaff: SettingsAction.ADD_STAFF,
            onDeleteStaff: SettingsAction.DELETE_STAFF,
            onGetStaffById: SettingsAction.GET_STAFF_BY_ID,
            onGetRoutesById: SettingsAction.GET_ROUTES_BY_ID,
            onClear: SettingsAction.CLEAR
        });

    }


    onGetStaffs(staffs) {
        this.staffs = staffs;
    }

    onSetStaff(staff) {
        var index = _.findIndex(this.staffs, {id: staff.id});
        this.staffs[index] = staff;
    }

    onSetStaffActive(staff) {
        var index = _.findIndex(this.staffs, {id: staff.id});
        this.staffs[index] = staff;
    }

    onaAddStaff(staff) {
        this.staffs.push(staff);
    }

    onDeleteStaff(data) {
        this.staffs = _.filter(this.staffs, (item) => item.id != data.id)
    }

    onGetStaffById(staff) {
        this.staff = staff;
    }
    onGetRoutesById(routes) {
        _.assign(this.routes, routes);
    }

    onClear() {
        var self = this;

        this.staff = {active: true};

        self.routes = [];
        this.routeNames.map((item) => {
                self.routes.push({
                    route: item.route,
                    action: 'read'
                })
            });
    }


}

export default alt.createStore(StaffStore, 'StaffStore');