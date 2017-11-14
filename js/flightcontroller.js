(function() {
    function flightcontroller(flightview, model) {
        var _t = this;
        this.flightview = flightview;
        this.model = model;
        this.data = [];
        this.sortabledata = [];
        //
        this.timeDuration = "";
        this.timeDurationMin = "0.00";
        this.timeDurationMax = "100.00";
        this.timeArrival = "";
        this.timeArrivalMin = "00.00";
        this.timeArrivalMax = "23.59";
        this.timeDeparture = "";
        this.timeDepartureMin = "00.00";
        this.timeDepartureMax = "23.59";
        this.filteredar = [];
        //

        var pathname = window.location.href;
        var url = new URL(pathname);
        var url_from = url.searchParams.get("from");
        var url_to = url.searchParams.get("to");
        var url_seats = url.searchParams.get("seats");
        this.data = this.model.getData(url_from, url_to, url_seats);
        console.log(this.data[0]);
        this.data.forEach(function(element) {
            element.Arrival = ConvertTimeformat("24", element.Arrival);
            element.Departure = ConvertTimeformat("24", element.Departure);
            element.Duration = ConvertHhMm(element.Duration);
        });
        this.filteredar = this.data;
        this.flightview.writeData(this.data);
        /////////////////////////////////binding events/////////////////////////////////
        this.flightview.bind('prizesort', function(ev) {
            _t.prizesortHandler(ev);
        });
        this.flightview.bind('time-duration', function(ev) {
            _t.timeDurationHandler(ev);
        });
        this.flightview.bind('time-ar-dp-filter', function(ev) {
            _t.arrivalDepFilterHandler(ev);
        });
        this.flightview.bind('sort-list', function(ev) {
            _t.sortElementHandler(ev);
        });
        this.flightview.bind('apply-filter', function(ev) {
            _t.applyfilterHandler(ev);
        });
        this.flightview.bind('reset-filter', function(ev) {
            _t.resetfilterHandler(ev);
        });

    }
    flightcontroller.prototype.prizesortHandler = function(event) {
        var _t = this;
        _t.Revercear();
        _t.flightview.writeData(this.data);
    }
    flightcontroller.prototype.applyfilterHandler = function(event) {
        var _t = this;
        _t.applyfilter(event);


    }
    flightcontroller.prototype.resetfilterHandler = function(event) {
        var _t = this;

        _t.timeDuration = "";
        _t.timeDurationMin = "0.00";
        _t.timeDurationMax = "100.00";
        _t.timeArrival = "";
        _t.timeArrivalMin = "00.00";
        _t.timeArrivalMax = "23.59";
        _t.timeDeparture = "";
        _t.timeDepartureMin = "00.00";
        _t.timeDepartureMax = "23.59";
        _t.flightview.writeData(_t.data);
    }

    flightcontroller.prototype.Revercear = function() {
        _t = this;
        _t.data.reverse();
    }

    flightcontroller.prototype.timeDurationHandler = function(event) {
        var _t = this;
        _t.timeDurationMin = event.el.attr('data-min');
        _t.timeDurationMax = event.el.attr('data-max');
    };

    flightcontroller.prototype.arrivalDepFilterHandler = function(event) {
        var _t = this;

        var min = event.el.attr('data-min'); // min value from html element
        var max = event.el.attr('data-max'); // max value from html element
        var key = event.el.attr('data-key'); // key value from html element
        _t.SortByTimeDepArr(event, min, max, key); //calling function to sort by Duration parameter (event min max)		
    }

    flightcontroller.prototype.sortElementHandler = function(event) {
        var _t = this;
        var key = event.el.attr('data-key'); // min value from html element

        switch (key) {
            case "Price":
                _t.filteredar.sort(function(a, b) {
                    return a.Price > b.Price;
                });
                break;
            case "Arrival":
                _t.filteredar.sort(function(a, b) {
                    return a.Arrival > b.Arrival;
                });
                break;
            case "Duration":
                _t.filteredar.sort(function(a, b) {
                    return a.Duration > b.Duration;
                });
                break;
            case "Departure":
                _t.filteredar.sort(function(a, b) {
                    return a.Departure > b.Departure;
                });
        }

        _t.flightview.writeData(_t.filteredar);
    }
    flightcontroller.prototype.applyfilter = function() {

        var _t = this;

        var temp_ar = _t.data;

        filter_ar = [];
        filter_ar = temp_ar.filter(function(element) {
            if (((element.Duration >= _t.timeDurationMin) && (element.Duration < _t.timeDurationMax)) &&
                ((element.Arrival >= _t.timeArrivalMin) && (element.Arrival < _t.timeArrivalMax)) && ((element.Arrival >= _t.timeDepartureMin) && (element.Arrival < _t.timeDepartureMax))) {
                return element;
            }
        });
        _t.filteredar = filter_ar;
        _t.flightview.writeData(filter_ar);

    };

    /////////////////// functions

    flightcontroller.prototype.SortBytimeDuration = function(ev, min, max) {
        var _t = this;
        temp_ar = _t.data;
        filter_ar = [];
        temp_ar.forEach(function(element) {
            element.Duration = ConvertHhMm(element.Duration);
        });

        filter_ar = temp_ar.filter(function(element) {
            if ((element.Duration >= min) && (element.Duration < max)) {
                return element;
            }
        });

        filter_ar.forEach(function(element) {
            element.Duration = reConvertDuration(element.Duration);
        });

        _t.flightview.writeData(filter_ar);
    };

    flightcontroller.prototype.SortByTimeDepArr = function(event, min, max, key) {
        var _t = this;
        if (key == "Arrival") {
            this.timeArrivalMin = event.el.attr('data-min');
            this.timeArrivalMax = event.el.attr('data-max');
        } else {
            this.timeDepartureMin = event.el.attr('data-min');
            this.timeDepartureMax = event.el.attr('data-max');
        }

    };




    // logics function
    function ConvertTimeformat(format, str) {
        var time = str;
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return sHours + "." + sMinutes;
    }


    function tConv12(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10) ? ("0" + h) : h; // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
    };


    function ConvertHhMm(timestr) {
        var hh = 0;
        var mm = 0;
        if (timestr.length <= 8) {

            hh = timestr.substring(0, 1);
            mm = "00";

        } else {

            hh = timestr.substring(0, 1);
            mm = timestr.substring(8, 10);
        }
        return hh + "." + mm;
    }


    window.flightcontroller = flightcontroller;
})();