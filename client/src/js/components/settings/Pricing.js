import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from'./../../../../../common/js/AlertActions';
import Select from'./../../../../../common/js/Select';
import _ from 'lodash';


class Pricing extends React.Component{

    constructor(){
        super();
    }

    render(){

        return <div className="col-sm-12 clearfix pricing-box">
                <ul className="clearfix price-list">
                    {Object.keys(this.props.tariff).map((key) => {
                        var value = this.props.tariff[key];
                        return <li className="price_col price_col_blue  first">
                            <div className="price_item">
                                <div className="price_col_head">
                                    <div className="price">12121212</div>
                                </div>
                                <div className="price_col_body clearfix">
                                    <div className="price_body_inner">
                                        <div className="price_body_top">
                                            <span>some text</span>
                                            <strong>1111</strong>
                                            <span>2222</span>
                                            <div className="line"></div>
                                        </div>
                                        <Select values={[{name: 3, id: 1},{name: 6, id: 2}, {name: 12, id: 3}]}
                                                current_value={1}
                                                fields={{
                                            name: 'name',
                                            value: 'id'
                                        }}
                                        />
                                        <ul>
                                            <li>some info1</li>
                                            <li>some info2</li>
                                            <li>some info3</li>
                                        </ul>

                                    </div>
                                </div>
                                <div className="price_col_foot">
                                    <a href="#" className="btn btn-blue">
                                        <span>Buy Now</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>

    }

}


export default Pricing;