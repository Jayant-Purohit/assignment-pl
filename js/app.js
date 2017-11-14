(function() {
	function APPindex(app,id) {
		app.indexview = new indexview(id);
		app.model = new model(id);
		app.indexcontroller = new indexcontroller(app.indexview,app.model);
	}
	window.pg1 = window.pg1 || {};
	APPindex(window.pg1,'index-id');

})();
