function ozConverter(ounces) {
	
			const lb = Math.floor(ounces / 16);
			const lb_remainder = ounces % 16;
			const oz = Math.floor(lb_remainder);
			
			return {
				lb : lb,
				oz : oz
			};
		}
		
export default ozConverter;