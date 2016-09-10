import React from 'react';

import './Hello.scss'
import logo from '../assets/logo.png'

import dateUtils from '../util/dateUtils';

import World from './World'

export default class Hello extends React.Component {
    constructor(props){
        super();
        this.state = {
            text: 'Hello'
        }
    }

    render() {
        return <h1 onClick = {this.click} > 
            <img src={logo} />
            <i className="logo logo1"></i>
            {this.state.text} <World />!
        </h1>;
    }
    
    click = (event) => {
        this.setState({
            text: 'Hello'
        })
    }
}