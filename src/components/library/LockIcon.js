import React from 'react';

function LockIcon(props){
	
	const style = {
		icon : {
			width: 16,
			height: 16,
			backgroundImage: "url(src/img/ribbonCaps.png)",
			backgroundRepeat: "no-repeat",
			display: "inline-block",
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
		off : {
			display: "none"
		},
		applyStyle(setting) {
			return Object.assign({},this.icon, this[setting]);
		}
		
	}
	
	return (
		<div className="lock-icon" style={style.applyStyle(props.display)} />
	)
}

export default LockIcon;