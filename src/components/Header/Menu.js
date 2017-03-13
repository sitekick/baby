import React, {Component, PropTypes} from 'react';


export default class Menu extends Component {
	
	constructor(props) {
	
		super(props);
		
		this.state = {
			hovered : false
		}
		
		this.handleClick = this.handleClick.bind(this);
	}	
	
	handleClick(){
		
		this.setState((prevState,props) => ({
			hovered : !prevState.hovered
		}))
		
	}
	
	render() {
		
		const style = {
			wrapper : {
				display: "table-cell",
				verticalAlign: "middle",
				width: "5%"
			},
			icon : {
				color: "#A6B1E1",
				fontSize: "2em",
				fontStyle: "normal",
				fontFamily: "sans-serif",
				cursor: "pointer",
				display: "inline-block",
				position: "relative",
				height: 40,
				width: "100%"
			},
			hover : {
				ul : {
					position: "absolute",
					fontSize: "1rem",
					top: 40,
					right: 0,
					background: "#FFF",
					listStyle: "none",
					display: "none",
					margin: 0,
					padding: 0,
					textAlign: "left",
					border: "1px solid #E8EBF7"
				},
				li : {
					margin: 0,
					padding: 0,
					borderBottom: "1px solid #E8EBF7"
				},
				a : {
					display: "inline-block",
					cursor: "pointer",
					padding: ".25em .5em",
					color: "#2F4550",
					textDecoration: "none"
				},
				hoverState : function(hover) {
					if(hover){
						return Object.assign({}, this.ul, {display: "block"})
					} else {
						return this.ul;
					}
				}
			}
		}
		
		return (
			<div className="menu" style={style.wrapper}>
				<i style={style.icon} onClick={this.handleClick} >⋮
					<ul style={style.hover.hoverState(this.state.hovered)}> 
					<li style={style.hover.li}><a style={style.hover.a} href="#" onClick={()=> {this.props.menuSelect('help')}}>Help</a></li>
					<li style={style.hover.li}><a style={style.hover.a} href="#" onClick={()=> {this.props.menuSelect('settings')}}>Settings</a></li>
					</ul>
				</i>
			</div>
		)
	}

}

Menu.propTypes = {
	menuSelect : PropTypes.func.isRequired
}






