/*
    AJAX request.
*/ 

(function(root) {
    Ω.xhr = (function() {
    return {
        get: function(url, onsuccess, onfail) {
            var request = new XMLHttpRequest();

            request.open('GET', url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    if (onsuccess) {
                        onsuccess(request.responseText);
                    }

                } else {
                    // We reached our target server, but it returned an error
                    if (onfail) {
                        onfail();
                    }
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                onfail(arguments);
            };

            request.send();
        },
        post: function(url, data, onsuccess, onfail) {
            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!

                    if (onsuccess) {
                        onsuccess(request.responseText);
                    }

                } else {
                    // We reached our target server, but it returned an error
                    if (onfail) {
                        onfail();
                    }
                }
            };

            request.send(data);
        },
        getJSON: function(url, onsuccess, onfail) {
            var request = new XMLHttpRequest();

            request.open('GET', url, true);

            // http://stackoverflow.com/questions/9820195/what-is-the-q-0-01-getjson-adds-to-the-request-header
            request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    if (onsuccess) {
                        onsuccess(typeof request.response === "string" ? JSON.parse(request.response): request.response);
                    }

                } else {
                    // We reached our target server, but it returned an error
                    if (onfail) {
                        onfail();
                    }
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                onfail(arguments);
            };

            request.send();
        }
    };
})();
 })(this);
 