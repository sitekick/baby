import React, { Component } from 'react';

var classNames = require('classnames');

export default class Switch extends Component {
	
	constructor(props) {
		
		super(props)
		
	}
	
	render() {
		
		
		const switchClass = classNames('switch', this.props.size)
		
		return (
			<label className={switchClass} >
			 {this.props.children}
			 	<div className="slider" />
			</label>
		)
	}
}