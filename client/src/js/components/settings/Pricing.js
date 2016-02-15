import React from 'react';
import SettingsAction from'./../../actions/SettingsAction'
import SettingsStore from'./../../stores/SettingsStore';
import AlertActions from'./../../../../../common/js/AlertActions';
import Select from'./../../../../../common/js/Select';
import _ from 'lodash';


class PricingItem extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    onChange(e) {

    }

    render() {
        return <li className="price_col price_col_blue  first">
                            <div className="price_item">
                                <div className="price_col_head">
                                    <div className="price">12121212</div>
                                </div>
                                <div className="price_col_body clearfix">
                                    <div className="price_body_inner">
                                        <div className="price_body_top">
                                            <span>some text</span>
                                            <strong>{key}</strong>
                                            <span>{this.props.currentTariff[this.props.key].price}</span>
                                            <div className="line"></div>
                                        </div>
                                        <Select values={value}
                                                current_value={this.props.currentTariff[this.props.key].time}
                                                fields={{
                                                name: 'time',
                                                value: 'price'
                                                }}
                                                onChange={this.onChange}
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
    }
}

class Pricing extends React.Component{

    constructor(){
        super();
        this.state={
            current: []
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
    debugger
    }

    render(){
        var self = this;
        console.log('this.props', this.props)
        return <div className="col-sm-12 clearfix pricing-box">
                <ul className="clearfix price-list">
                    {Object.keys(this.props.tariff).map((key) => {
                        var values = self.props.tariff[key];
                        return <PricingItem values={values} key={key} currentTariff={self.props.currentTariff}/>
                    })}
                </ul>
            </div>

    }

}


export default Pricing;