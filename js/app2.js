(function() {

function APPflight(app,id) {
		app.flightview = new flightview(id);
		app.model = new model(id);
		app.flightcontroller = new flightcontroller(app.flightview,app.model);
	}



	window.pg2 = window.pg2 || {};
	APPflight(window.pg2,'flight-id');


})();
