import React, {PropTypes} from 'react';
import Countdown from './Countdown';
import CalendarIcon from './CalendarIcon';
import Menu from './Menu';

function Header(props) {
			
	return (
		<header>
			<h1>{props.appSettings.babyName}</h1>
			<div className="ribbon">
				<div className="ribbon-cap left"></div>
				<div className="ribbon-message"><p>{props.appSettings.message}</p></div>
				<div className="ribbon-cap right"></div>
			</div>
			<div className="info">
				<CalendarIcon dueDate={props.appSettings.dueDate} />
				<Countdown dueDate={props.appSettings.dueDate} menuSelectBubble1={props.menuSelectBubble2} />
				<Menu menuSelect={props.menuMenuSelect} />
			</div>
		</header>
	);
};

Header.propTypes = {
	menuMenuSelect : PropTypes.func.isRequired
}

export default Header;

