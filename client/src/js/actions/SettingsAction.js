import alt from '../alt';
import Promise from 'bluebird';
import ApiActions from './ApiActions';

class SettingsAction {

    get() {
        var self = this;
        ApiActions.get('settings').then(function(data){
            self.dispatch(data);
        }).catch(function(err){
            //self.dispatch(err);
        })
    }

    getAllCurrencies() {

        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.get(`currency`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                //self.dispatch(err);
                reject(err);
            })
        })
    }

    setBasicCurrency(id) {

         var self = this;
            ApiActions.put(`basicCurrency`, {id: id}).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
                self.dispatch(err);
            })
    }

    getBasicCurrency() {
         var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.get(`basicCurrency`).then(function(data){
                self.dispatch(data);
                resolve(data);
            }).catch(function(err){
                //self.dispatch(err);
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
                 self.dispatch(err);
                  reject(err);
             })
         })
    }

    getRate() {
        var self = this;
            ApiActions.get(`rate`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
                self.dispatch(err);
        })
    }

    getFee() {
        var self = this;
            ApiActions.get(`fee`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
                self.dispatch(err);
        })
    }

    editFee(fee) {
        var self = this;
        return new Promise((resolve, reject) => {
             ApiActions.put(`fee`, {fee: fee}).then(function(data){
                self.dispatch(data);
                 resolve(data);
            }).catch(function(err){
                //self.dispatch(err);
                 debugger
                 reject(err);
            })
        })
    }

    getPayment() {
        var self = this;
            ApiActions.get(`payment`).then(function(data){
                self.dispatch(data);
            }).catch(function(err){
                self.dispatch(err);
        })
    }

    editPayment(data) {
        var self = this;
        return new Promise((resolve, reject) => {
            ApiActions.put(`payment`, data).then(function(result){
                self.dispatch(result);
                resolve(result);
            }).catch(function(err){
                //self.dispatch(err);
                //reject(err);
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
                debugger
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
                debugger
            })
         })
    }

    getMessages() {
        var self = this;
         ApiActions.get(`messages`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
            })
    }

    setMessage(data) {
        var self = this;
         ApiActions.put(`messages/${data.id}`, data.data).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
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
                debugger
            })
    }

    getStaffById(id) {
        var self = this;
         ApiActions.get(`staff/${id}`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
            })
    }

    setStaff(data) {
        var self = this;
         ApiActions.put(`staff/${data.id}`, data.data).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
            })
    }

    deleteStaff(data) {
        var self = this;
         ApiActions.remove(`staff/${data.id}`).then(function(result){
                 self.dispatch(result);
            }).catch(function(err){
                debugger
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

}

export default alt.createActions(SettingsAction);