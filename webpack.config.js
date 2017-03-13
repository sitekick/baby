module.exports = {
	entry: './app.js',
	output : {
		filename: 'bundle.js',
		path: '/users/hunterw/sites/omv.imac/react/baby/'
	},
	module : {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot-loader','babel-loader']
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.png$/,
				loader: 'url-loader!img-loader'
			}
		]
		
	},
	devServer: {
    	proxy: { "/api" : {
	    	target: "http://baby.imac",
	    	pathRewrite: {"^/api" : ""}
    	}
	    	
      }
	}
}