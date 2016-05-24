import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class SettingsAction {

    get() {
        var self = this;
        ApiActions.get('settings').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
        })
    }

    getAllCurrencies() {

        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.get(`currency`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }

    setBasicCurrency(id) {

         var self = this;
        return new Promise ((resolve, reject) => {
            ApiActions.put(`basicCurrency`, {id: id}).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        });
    }

    getBasicCurrency() {
         var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.get(`basicCurrency`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }

    addRate(rate) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.put(`rate`, rate).then(function (data) {
                 self.dispatch(data);
                 resolve(data);
             }).catch(function (err) {
                  reject(err);
             })
         })
    }

    getRate() {
        var self = this;
            ApiActions.get(`rate`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
        })
    }

    getBankRate() {
        var self = this;
            ApiActions.get(`bank_rate`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
        })
    }

    getFee() {
        var self = this;
            ApiActions.get(`fee`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
        })
    }

    editFee(fee, fee_secondary) {
        var self = this;
        return new Promise((resolve, reject) => {
             ApiActions.put(`fee`, {fee: fee, fee_secondary: fee_secondary}).then(function(data){
                self.dispatch(data);
                 resolve(data);
            }).catch(function(err){
                 reject(err);
            })
        })
    }

    getPayment() {
        var self = this;
            ApiActions.get(`payments`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
        })
    }

    editPayment(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`payments`, data).then(function(result){
                self.dispatch(result);
                resolve(result);
            }).catch(function(err){
        })
        })
    }

    setNewPassword(data) {
        return new Promise((resolve, reject) => {
            ApiActions.put(`user/password`, data).then(function(result){

                resolve(result);
            }).catch(function(err){

                reject(err);
            })
        })
    }

    getTariff() {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.get(`settings/tariff`).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                 reject(err);
            })
         })
    }

    setTariff(obj) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.put(`settings/tariff`, obj).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                
            })
         })
    }

    getMessages() {
        var self = this;
         ApiActions.get(`messages`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){

            })
    }

    setMessage(data) {
        var self = this;
         ApiActions.put(`messages/${data.id}`, data.data).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){

            })
    }

    setIsActive(data) {
        this.dispatch(data);
    }

    getStaffs() {
        var self = this;
         ApiActions.get(`staff`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){

            })
    }

    getStaffById(id) {
        var self = this;
         ApiActions.get(`staff/${id}`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){

            })
    }

    deleteStaff(data) {
        var self = this;
         ApiActions.remove(`staff/${data.id}`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){

            })
    }

    addStaff(data) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.post(`staff`, data).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                 reject(err);
            })
         })
    }

    setStaff(data) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.put(`staff/${data.id}`, data).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                 reject(err);
            })
         })
    }

    setStaffActive(data) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.put(`staff/active/:id`, data).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                 reject(err);
            })
         })
    }

    getRoutesById(id) {
        var self = this;
         return new Promise((resolve, reject) => {
             ApiActions.get(`routes/${id}`).then(function(result){
                 self.dispatch(result);
                 resolve(result);
            }).catch(function(err){
                 reject(err);
            })
         })
    }

    clear() {
        this.dispatch();
    }

}

export default alt.createActions(SettingsAction);