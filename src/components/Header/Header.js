import React, {PropTypes} from 'react';
import Countdown from './Countdown';
import CalendarIcon from './CalendarIcon';
import Menu from './Menu';

function Header(props) {
			
	const style = {
		header : {
			textAlign: "center",
			marginBottom: "1em"
		},
		h1 : {
			margin: "0 0"
		},
		ribbon : {
			wrapper : {
				position: "relative",
				height: 72
			},
			message : {
				wrapper : {
					position: "absolute",
					height: 43,
					left: -18,
					right: -18,
					zIndex: 100,
					backgroundColor: "#F3B2D9",
					borderTop: "2px solid #FFF",
					borderBottom: "3px solid #B4869F",
					borderLeft: "2px solid #FFF",
					borderRight: "2px solid #FFF",
				},
				p : {
					color: "#FFF",
					fontSize: "1.75em",
					margin: 0,
					marginTop: 8
				}
			},
			cap : {
				left : {
					backgroundImage: "url(/src/img/ribbonCaps.png)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "0 0",
					position: "absolute",
					top: 24,
					left: -48,
					height: 48,
					width: 48,
					zIndex: -1
				},
				right : {
					backgroundImage: "url(/src/img/ribbonCaps.png)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "-48px 0",
					position: "absolute",
					top: 24,
					right: -48,
					height: 48,
					width: 48,
					zIndex: -1
				}
			},
		},
		countdown : {
			backgroundColor: "#E8EBF7",
			width: "95%",
			display: "table",
			margin: "-10px 2.5% 10px"
		},
		};

	return (
		<header style={style.header}>
			<h1 style={style.h1}>{props.appSettings.babyName}</h1>
			<div className="ribbon" style={style.ribbon.wrapper}>
				<div className="ribbon-cap left" style={style.ribbon.cap.left}></div>
				<div className="ribbon-message" style={style.ribbon.message.wrapper}><p style={style.ribbon.message.p}>{props.appSettings.message}</p></div>
				<div className="ribbon-cap right" style={style.ribbon.cap.right}></div>
			</div>
			<div className="countdown" style={style.countdown}>
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

