import React from 'react';
import WeightDisplay from '../../library/WeightDisplay';

const BabyImage = props => {
	
	const weight = props.ounces > 0 ? props.ounces : 140;
	
	const style = {
		babyWrap : {
			position: "relative",
			opacity: props.ounces > 0 ? 1 : .5
		},
		babyBody : {
			backgroundImage: "url(src/img/babySwaddle.png)",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			width: Math.floor(weight / 224 * 110),
			height: Math.floor(weight / 224 * 195),
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translateX(-50%) translateY(-50%)"
		},
		babyHead : {
			backgroundImage: "url(src/img/babySlices.png)",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "0 0",
			backgroundSize: "200% 400%",
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "56.41026%",
			zIndex: 1
		},
		babyEyes : {
			backgroundPosition: "100% 0%",
			height: "100%",
		},
		babyPacifier : {
			backgroundPosition: "0% 66.66667%",
			height: "100%",
		},
		babyGirl : {
			backgroundPosition: "0% 33.33333%",
			height: "100%",
		},
		babyBoy : {
			backgroundPosition: "100% 33.33333%",
			height: "100%",
		},
		applySlice(segment) {
			switch(segment){
				case 'face' :
					return Object.assign({},this.babyHead, this.babyFace);
				break;
				case 'eyes' :
					return Object.assign({},this.babyHead, this.babyEyes);
				break;
				case 'pacifier' :
					return Object.assign({},this.babyHead, this.babyPacifier);
				break;
				case 'boy' :
					return Object.assign({},this.babyHead, this.babyBoy);
				break;
				case 'girl' :
					return Object.assign({},this.babyHead, this.babyGirl);
				break;
				
			}
		}
	};
	
	return (
		<div className="baby-image" style={style.babyWrap}>
			<div style={style.babyBody}>
			<div style={style.babyHead}>
				<div className="eyes" style={style.applySlice('eyes')} />
				<div className="pacifier" style={style.applySlice('pacifier')} />
				<div style={(props.gender) ? style.applySlice(props.gender) : {}} />
			</div>
			</div>
			<WeightDisplay weightOz={props.ounces} displayBlock={true}/>
		</div>
	)
}

export default BabyImage;