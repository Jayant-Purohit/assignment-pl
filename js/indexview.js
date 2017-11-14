(function(){
	function indexview(id){
	var _t = this;
		this.cnt_id = id;
		this.cnt = document.getElementById(id);
		//elements
		this.elements = {
			FMDIV : _t.cnt.querySelector(".myfm") 
		};


	}

	indexview.prototype.bind = function(event,callback) {
		var _t=this;
		switch(event) {
			case "submit":
				this.elements.FMDIV.addEventListener("submit", function(event) {
					_t=this;
					event.preventDefault();
					callback(event);	
				});
			break;
		}

	};
	indexview.prototype.RedirectPage = function(ar){
		var url = "../flights.html?from="+ar[0].from+"&to="+ar[0].to+"&seats="+ar[0].seats;
		window.location.href = url;
	}


	window.indexview = indexview;
})();
