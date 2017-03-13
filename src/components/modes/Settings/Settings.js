import React, {PropTypes, Component} from 'react';
import CloseButton from '../../library/CloseButton';
import SettingsForm from './SettingsForm';

export default class Settings extends Component {
	
	constructor(props) {
		super(props)
	}
	
	render() {
		
	const style = {
		wrapper : {
			width: "95%",
			margin: "0 2.5% 1em"
		}
	}	
		
		return (
			<div className="mode settings" style={style.wrapper}>
			<CloseButton floatAlign="right" clickAction={() => {this.props.closeButtonClickAction('input')}}/>
			<h2>Settings</h2>
			<SettingsForm fieldValues={this.props.settingsData} settingsSubmit={this.props.settingsFormSettingsSubmit}/>
			</div>
		)
		
	}
}

Settings.propTypes = {
	closeButtonClickAction : PropTypes.func.isRequired,
	settingsFormSettingsSubmit: PropTypes.func.isRequired
}
