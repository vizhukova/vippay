import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';

/**
 * Компонент пагинации
 */
class Pagination extends React.Component {

    constructor() {
        super();
        this.state = {
            page: 1,
            currentPage: 1
        };
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {

    }

    changePage(e) {
        e.preventDefault();
        if(!e.target.dataset.page) return;
        console.log('ChangePage', e.target.dataset.page)
        this.props.onChangePage(e.target.dataset.page);
    }

    render() {
        var self = this;
        var pageArray = Array.apply(null, Array(this.props.pages)).map(function () {
        });
        console.log('currenPage', this.props.currentPage)

        return <div>
            { this.props.show ? <div className="inner">

                {!this.props.first ? <a onClick={this.changePage} className="page_prev"
                                        data-page={+this.props.currentPage - 1} href="#"><span/></a> : null}

                {pageArray.map(function (el, i) {

                    var activeClass = +self.props.currentPage === i + 1 ? 'page_current' : '';

                    return <a key={i} onClick={self.changePage} data-page={i + 1}
                              className={`page-numbers ${activeClass}`} href="#">{i + 1}</a>
                })}

                { !this.props.last ? <a className="page_next"
                                        onClick={this.changePage}
                                        data-page={+this.props.currentPage + 1} href="#">
                                        <span/>
                                    </a> : null}
            </div> : null}
        </div>
    }


}

export default Pagination;