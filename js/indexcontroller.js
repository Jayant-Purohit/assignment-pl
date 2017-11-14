(function(){
	function indexcontroller(indexview,model){
	var _t = this;
	this.indexview = indexview;
	this.model = model;
	this.data =[]; 
	this.indexview.bind('submit', function(ev){
			_t.callsubmithandller(ev);
		});
	}

	indexcontroller.prototype.callsubmithandller = function(ev) {
		var _t=this;
		_t.Save(ev);
	};

indexcontroller.prototype.Save = function(ev){
		_t=this;
		var fm_from =event.target.from.value; 
		var fm_to =event.target.to.value; 
		var fm_seats =event.target.seats.value; 
		_t.data.push({from:fm_from, to:fm_to, seats:fm_seats});  
		_t.indexview.RedirectPage(_t.data);
	};

window.indexcontroller = indexcontroller;
})();