const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './app.js'],
	output : {
		filename: 'bundle.js',
		path: '/users/hunterw/sites/omv.imac/react/baby/'
	},
	module : {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|arch)/,
				use: ['react-hot-loader','babel-loader']
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', {
						loader: 'css-loader',
						options : {
							importLoaders: 1
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.png$/,
				use: ['url-loader','img-loader']
			},
			{
				test: /\.modernizrrc.js$/,
				use: 'modernizr-loader'
				
      		},
	  		{
	  			test: /\.modernizrrc(\.json)?$/,
	  			use: ['modernizr-loader','json-loader']
	  		}
		]
	},
	devtool: 'source-map',
	devServer: {
    	proxy: { "/api" : {
	    	target: "http://baby.imac",
	    	pathRewrite: {"^/api" : ""}
    	}
	    	
      }
	},
	resolve: {
    	alias: {
			modernizr$: path.resolve(__dirname, "/users/hunterw/sites/omv.imac/react/baby/.modernizrrc")
	    }
  	}
}