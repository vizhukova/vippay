import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Pagination from'./Pagination';


class List extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 2,
            currentPage: 1,
            perPage: 10
        };
        this.changePage = this.changePage.bind(this);
    }

     componentDidMount() {
        this.state.perPage = this.props.perPage ? this.props.perPage : this.state.perPage;
         this.setState({});
    }

    componentWillReceiveProps(props){
        this.state.perPage = this.props.perPage ? this.props.perPage : this.state.perPage;
        this.setState({});
    }

    changePage(page){
        this.setState({
            currentPage: page
        })
    }

    render(){
        var Item = this.props.itemComponent;
        var Head = this.props.theadComponent;

        if (!this.props.items) return;
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
                            {this.props.add_link ? <Link to={this.props.add_link}
                                  className="btn btn-action-big btn-default glyphicon glyphicon-plus" /> : null }
                        </div>

                        <table className="table table-hover">
                            {this.props.theadComponent ?
                                 <thead>
                                     <Head sort={this.props.sort} />
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