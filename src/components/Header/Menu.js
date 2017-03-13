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
		
		return (
			<div className="menu">
				<i onClick={this.handleClick} >⋮
				<ul> 
					<li><a href="#" onClick={()=> {this.props.menuSelect('help')}}>Help</a></li>
					<li><a href="#" onClick={()=> {this.props.menuSelect('settings')}}>Settings</a></li>
				</ul>
				</i>
			</div>
		)
	}

}

Menu.propTypes = {
	menuSelect : PropTypes.func.isRequired
}