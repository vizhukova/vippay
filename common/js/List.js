import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Pagination from'./Pagination';


class List extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 2,
            currentPage: 1
        };
        this.changePage = this.changePage.bind(this);
    }

     componentDidMount() {
        var page = 1;
       /*if(this.props.params.page){
            page = this.props.params.page;
        }*/
    }

    componentWillReceiveProps(props){
        var page = 1;
        /*if (props.params.page){
            page = props.params.page;
        }*/
    }

    changePage(page){
        this.setState({
            currentPage: page
        })
    }

    render(){
        var Item = this.props.itemComponent;
        if (!this.props.items) return;
        var items =this.props.items.slice((this.state.currentPage - 1) * this.props.perPage , ((this.state.currentPage - 1) * this.props.perPage + this.props.perPage));
        var pages = Math.ceil(this.props.items.length/this.props.perPage);

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
                            {this.props.add_link ? <Link to={this.props.add_link}
                                  className="btn btn-action-big btn-default glyphicon glyphicon-plus" /> : null }
                        </div>

                        <table className="table table-hover">
                            {this.props.thead ?
                                 <thead>
                                     <tr>
                                     {this.props.thead.map((item) => {
                                         return <th>{item}</th>
                                     })}
                                      </tr>
                                 </thead> : null
                            }
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
                                currentPage={this.state.currentPage}
                                onChangePage={this.changePage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }


}

export default List;