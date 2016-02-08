import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';


class Pagination extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 1,
            currentPage: 1
        };
    }

     componentDidMount() {
        var page = 1;
       /* if(this.props.params.page){
            page = this.props.params.page;
        }*/
    }

    componentWillReceiveProps(props){
        var page = 1;
        /*if(props.params.page){
            page = props.params.page;
        }*/
    }

    render(){
        var self = this;

        var pageArray = Array.apply(null, Array(this.props.pages)).map(function () {});

        return <div>
            { this.props.show ? <div className="inner">

                {!this.props.first ? <a className="page_prev" href={`#/${this.props.type}/${+this.state.currentPage - 1}`}><span/></a> : null}

                {pageArray.map(function (el, i) {

                    var activeClass = +self.state.currentPage === i + 1 ? 'page_current' : '';

                    return <a href={`#/${self.props.type}/${i+1}`} className={`page-numbers ${activeClass}`}>{i + 1}</a>
                })}

                { !this.props.last ? <a className="page_next"
                               href={`#/${this.props.type}/${+this.state.currentPage +1}`}><span/></a> : null}
            </div> : null}
        </div>
    }


}

export default Pagination;