import React from 'react';
import PartnersAction from './../actions/PartnersAction';
import AuthAction from './../actions/AuthActions';
import PartnersStore from './../stores/PartnersStore';


class Partners extends React.Component {

    constructor(){
        super();
        this.state = PartnersStore.getState();

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        PartnersAction.getAll();
        PartnersStore.listen(this.update)
    }

    componentWillUnmount() {
        PartnersStore.unlisten(this.update)
    }

    update(state) {
        this.setState(state);
    }

    login(e){
        e.preventDefault();
        AuthAction.guestLogin(e.target.dataset.login).then(() => {
            location = '/partner'
        });
    }

    render(){
        var self = this;

        return  <table className="table">
                <thead>
                  <tr>
                    <th>Логин</th>
                    <th>Электронная почта</th>
                    <th>ФИО</th>
                  </tr>
                </thead>
                <tbody>
                 { this.state.partners.map(function(item, index) {
                     return <tr key={index}>
                         <td>{item.login}</td>
                         <td>{item.email}</td>
                         <td>{item.name}</td>
                         <td><a data-login={item.login} onClick={self.login} href="#">Войти под именем</a></td>
                     </tr>
                 })}
                </tbody>
              </table>

    }


}


export default Partners;