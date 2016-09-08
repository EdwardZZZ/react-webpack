import React from 'react';

import dateUtils from '../util/dateUtils';

import './component.scss'

import logo from './logo.png'

export default class Component extends React.Component {
    constructor(props){
        super();
        this.state = {
            text: '戳我显示时间'
        }
    }

    render() {
        return <h1 onClick = {this.click} > 
            <img src={logo} />
            <i className="logo logo1"></i>
            {this.state.text}
        </h1>;
    }
    
    showTime(){
        this.setState({
            text: dateUtils.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        })
    }
    
    click = (event) => {
        this.showTime()
        setInterval( () => this.showTime(), 1000)
    }
}