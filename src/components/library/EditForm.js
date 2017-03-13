import React, { Component, PropTypes } from 'react';


export default class EditForm extends Component {
//const EditForm = props => {	
	
	constructor(props) {
		
		super(props);
		
		//console.log(props);
	}
	
	
	
	render() {
		return (
			<div className="callout edit">
				<button onClick={(e)=>{this.props.onEditFieldChange('button', e)}}>Edit</button>
				<form id="edit">
				<input 
					type="password" 
					name="password" 
					value={this.props.editState.password} 
					onChange={(e)=>{this.props.onEditFieldChange('password', e)}} 
					disabled = {(this.props.editState.toggle === true) ? "disabled" : null }
					/>
				<input 
					type="submit" 
					name="submit" 
					value="submit" 
					onClick={(e)=>{this.props.onEditFieldChange('submit', e)}}
					disabled = {(this.props.editState.toggle === true) ? "disabled" : null }
				/>
				</form>
			</div>
		)
	}
	
}

EditForm.propTypes = {
	onEditFieldChange : PropTypes.func.isRequired
}
