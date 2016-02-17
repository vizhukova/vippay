import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Pagination from'./Pagination';
import SettingsStore from'./../../client/src/js/stores/SettingsStore';
import _  from 'lodash';


class List extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 2,
            currentPage: 1,
            perPage: 10,
            sort: {
                type: 1
            }
        };
        _.assign(this.state, SettingsStore.getState());

        this.changePage = this.changePage.bind(this);
        this.sort = this.sort.bind(this);
        this.update = this.update.bind(this);
    }

     componentDidMount() {
         SettingsStore.listen(this.update)
        this.state.perPage = this.props.perPage ? this.props.perPage : this.state.perPage;
         this.setState({});
    }

    componentWillUnount() {
        SettingsStore.unlisten(this.update)
    }

    update(state) {
        _.assign(this.state, state);
        this.setState({});
    }

    componentWillReceiveProps(props){
        this.state.perPage = props.perPage ? props.perPage : this.state.perPage;
        this.setState({});
    }

    changePage(page){
        this.setState({
            currentPage: page
        })
    }

    sort(e) {
        var key = e.target.dataset.name;
         if(! key) return;
        var sortBy = e.target.dataset.name.split('.');


            this.props.items.sort((a, b) => {
                if(sortBy.length > 1) {
                    a = a[sortBy[0]][sortBy[1]];
                    b = b[sortBy[0]][sortBy[1]];
                } else {
                    a = a[sortBy[0]];
                    b = b[sortBy[0]];
                }

                    a = a || '';
                    b = b || '';

                if(typeof a == 'string') {

                    if (key == this.state.sort.name && this.state.sort.type == -1) {
                        return a.localeCompare(b);
                    } else return b.localeCompare(a);

                } else {

                    if (key == this.state.sort.name && this.state.sort.type == -1) {
                        return a - b;
                    } else return b - a;

                }

            })

            this.setState({sort: {
                name: key,
                type: this.state.sort.type * (-1)
             }});
    }

    render(){
        var Item = this.props.itemComponent;
        var ChildrenComponents = this.props.ChildrenComponents;

        if (!this.props.items) return;
        var self = this;
        var items =this.props.items.slice((this.state.currentPage - 1) * this.state.perPage , ((this.state.currentPage - 1) * this.state.perPage + this.state.perPage));
        var pages = Math.ceil(this.props.items.length/this.state.perPage);

        var isPagination = pages > 1;
        var isLast = this.state.currentPage == pages;
        var isFirst = this.state.currentPage == 1;

        return <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-wrapper">

                        <div className="table-head">
                        <span className="title">
                            {this.props.title}
                        </span>
                            {this.props.children}
                            {this.props.add_link ? <Link to={this.props.add_link}
                                  className={`btn btn-action-big btn-default glyphicon glyphicon-plus
                                  ${this.state.isActiveTariff ? '' : 'disabled'}`} /> : null }
                        </div>

                        <table className="table table-hover">
                            {this.props.thead ?
                                 <thead>
                                     <tr>
                                     {this.props.thead.map((item) => {
                                         return <th className={this.state.sort.name == item.key  ? 'check' : 'uncheck'}
                                                    data-name={item.key}
                                                    onClick={this.props.sort ? this.props.sort : this.sort}>
                                                 {item.name}
                                             </th>
                                     })}
                                     </tr>
                                 </thead> : null
                            }
                            <tbody>
                            { items.map(function (item, index) {
                                return <Item item={item} key={index} isActiveTariff={self.state.isActiveTariff} />
                            })}
                            </tbody>
                        </table>
                        <div className="table-footer">
                            {this.props.isPaginate ?
                            <Pagination
                                show={isPagination}
                                first={isFirst}
                                pages={pages}
                                last={isLast}
                                currentPage={this.state.currentPage}
                                onChangePage={this.changePage}
                            /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }


}

export default List;