(function() {
	
	var xhr = new XMLHttpRequest();
	var url = 'src/data/babyGuesses.json';
	
	if(!xhr) {
		ReactDOM.render(<p>Could not load data</p>, document.getElementById('app'));
	} else {
		xhr.onreadystatechange = _loadData;
		xhr.open('GET', url);
		xhr.send();
	}
	
	function _loadData() {
		
		if(xhr.readyState === xhr.DONE) {
			
			if(xhr.status === 200){
				var data = JSON.parse(xhr.responseText);
				ReactDOM.render(<GuessApp data={data} />, document.getElementById('app'));
			}
		}
	}
	
})()


saveJSON : success => {
				var data = Object.assign({},{settings : this.state.settings}, {guesses : this.state.guesses});
				var newDataString = JSON.stringify(data);
				var url = 'inc/process.php';
				var xhr = new XMLHttpRequest();
			    xhr.open('POST', url);
			    xhr.onreadystatechange = function() {
			        if (this.readyState==4 && this.status==200) { 
				        success(xhr.responseText); 
				    }
			    };
			    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			    xhr.setRequestHeader('Content-Type', 'application/json');
			    xhr.send(newDataString);
			},