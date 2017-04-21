import React, {Component} from 'react';

export default class LockIcon extends Component{
	
	constructor(props) {
		
		super(props)
		
		this.state = {
			hovered : false
		}
		
		this.handleHover = this.handleHover.bind(this);
	}
	
	handleHover(mouseState) {
		this.state.hovered = (mouseState === 'enter') ? true : false;
		this.setState(this.state);
	}
	
	render(){
		
	const style = {
		icon : {
			width: 14,
			height: 16,
			backgroundImage: "url(src/img/sprites.png)",
			backgroundRepeat: "no-repeat",
			display: "inline-block",
			position: "relative",
			cursor: "pointer"
		},
		lavendar : {
			backgroundPosition: "0 -96px",
		},
		dark : {
			backgroundPosition: "0 -112px",
		},
		white : {
			backgroundPosition: "0 -128px",
		},
		darkpink : {
			backgroundPosition: "-14px -96px",
		},
		off : {
			display: "none"
		},
		applyStyle(setting) {
			return Object.assign({},this.icon, this[setting]);
		},
		span : {
			display: (this.state.hovered === true) ? 'block' : 'none',
			whiteSpace: "nowrap",
			position: "absolute"
		}
		
	}	
		
		return (
		<div className="lock-icon" style={style.applyStyle(this.props.display)} onMouseEnter={() => this.handleHover('enter')} onMouseLeave={() => this.handleHover('leave')}>
		 <span style={style.span}>{this.props.hoverMessage ? this.props.hoverMessage : 'This field is locked'}</span>
		</div>
	)
	}
	
}
