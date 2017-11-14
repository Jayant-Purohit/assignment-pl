(function() {
    function flightview(id) {
        var _t = this;
        this.cnt_id = id;


        var _t = this;
        this.cnt_id = id;
        this.cnt = document.getElementById(id);
        this.elements = {
            CONTAINER: this.cnt.querySelector(".sortelement"),
            MAX_MIN: this.cnt.querySelector(".prize-toggle"),
            DURATION_FILTER: this.cnt.querySelector(".dur-time-filter"),
            TIME_AR_DP_FILTER: this.cnt.querySelector(".filter-arr-dp"),
            SORT_LIST_ELEMENT: this.cnt.querySelector(".sortlistElement")
        };
        //elements
    }
    flightview.prototype.bind = function(event, callback) {
        var _t = this;
        switch (event) {

            case "prizesort":
                $(".prize-toggle").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;
            case "time-duration":

                $(".dur-time-filter").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;

            case "time-ar-dp-filter":
                $(".filter-arr-dp").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;
            case "sort-list":
                $(".sortlistElement").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;
            case "apply-filter":
                $(".btn-flt-apply").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;
            case "reset-filter":
                $(".reset-btn").on("click", function(event) {
                    event.el = $(this);
                    callback(event);
                });
                break;

        }

    };



    flightview.prototype.writeData = function(ar) {
        _t = this
        var ar = ar;
        var html = "";
        if (ar.length == 0) {
            html = "oops sorry no Flights in service.."
        } else {


            var pathofimage = "";

            ar.forEach(function(element) {

                pathofimage = getflagPath(element.Airline);
                html += "<div class='wrap'>";
                html += "<div class='one one-logo'><img src='" + pathofimage + "'></div>";
                html += "<div class='one one-name'>" + element.Airline + "</div>";
                html += "<div class='two'>";
                html += "<div class='fm'>" + element.Departure + "</div>";
                html += "<div class='dr'>" + element.Duration + "</div>";
                html += "<div class='to'>" + element.Arrival + "</div>";
                html += "<div class='parent'>";
                html += "<span class='sl'></span><span class='sr'></span><div class='line'></div></div></div>";
                html += "<div class='three'>" + element.Price + "</div>";
                html += "</div>";
            });
        }
        _t.elements.CONTAINER.innerHTML = html;
    };

    function getflagPath(name) {
        var path = "";
        switch (name) {
            case "Air India":
                path = "img/airindia.png";
                break;
            case "Jet Airways":
                path = "img/jeta.png";
                break;
            case "Indigo":
                path = "img/indigo.jpg";
                break;
            default:
                path = "img/dummy.png";
        }

        return path;
    }



    window.flightview = flightview;
})();