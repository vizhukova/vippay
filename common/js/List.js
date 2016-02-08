import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Pagination from'./Pagination';


class List extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 2,
            currentPage: 2
        };
    }

     componentDidMount() {
        var page = 1;
       if(this.props.params.page){
            page = this.props.params.page;
        }
    }

    componentWillReceiveProps(props){
        var page = 1;
        if (props.params.page){
            page = props.params.page;
        }
    }

    render(){
        var Item = this.props.itemCategory;
        debugger;
        var self = this;
        if (!this.props.items) return;
        var items =this.props.items.slice((this.state.currentPage - 1) * this.props.perPage , ((this.state.currentPage - 1) * this.props.perPage + this.props.perPage));

        var pages = Math.ceil(this.props.items.length/this.props.perPage);

        var isPagination = pages > 1;
        var isLast = false;
        var isFirst = false;

        return <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-wrapper">

                        <div className="table-head">
                        <span className="title">
                            {this.props.title}
                        </span>
                            <Link to={this.props.add_link}
                                  className="btn btn-action-big btn-default glyphicon glyphicon-plus" />
                        </div>

                        <table className="table table-hover">
                            <tbody>
                            { items.map(function (item, index) {
                                return <Item item={item} key={index}/>
                            })}
                            </tbody>
                        </table>
                        <div className="table-footer">
                            <Pagination
                                show={isPagination}
                                first={isFirst}
                                pages={pages}
                                last={isLast}
                                type="categories"
                                currentPage={this.state.currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }


}

export default List;