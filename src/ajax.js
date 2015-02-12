/*
    AJAX request.
*/ 

(function(root) {
    Ω.xhr = (function() {
        return {
            /**
             * Before send request
             * @param config - {
             *    type: GET/POST/PUT/DELETE
             *    contentType: text/json
             *    onSuccess:
             *    onFail:
             * }
             */
            ajax: function(config) {
                var request = new XMLHttpRequest();
                var onsuccess = config.onsuccess;
                var onerror = config.onerror;

                switch(config.type.toUpperCase()) {
                    case 'GET':
                        request.open('GET', config.url, true);
                        break;
                    case 'POST':
                        request.open('POST', config.url, true);
                        break;
                }

                switch(config.contentType) {
                    case 'text':
                        break;
                    case 'json':
                        // http://stackoverflow.com/questions/9820195/what-is-the-q-0-01-getjson-adds-to-the-request-header
                        request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
                        break;
                    default:
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        break;
                }

                request.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        clearTimeout(timeout);
                    }
                };

                request.onload = function() {
                    var response = request.response;

                    if (request.status >= 200 && request.status < 400) {
                        // Success!
                        if (onsuccess) {
                            switch(config.contentType) {
                                case 'xml':
                                    break;
                                case 'json':
                                    response = typeof response === "string"
                                        ? JSON.parse(response)
                                        : response;
                                    break;
                            }

                            onsuccess(response);
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

                var timeout = setTimeout( function () {
                    request.abort(); // call error callback
                }, 60*1000 /* timeout after a minute */ );

                request.send(config.data);
            },
            get: function(url, onsuccess, onfail) {
                this.ajax({
                    url: url,
                    type: 'get',
                    onsuccess: onsuccess,
                    onfail: onfail
                });
            },
            post: function(url, data, onsuccess, onfail) {
                this.ajax({
                    url: url,
                    type: 'post',
                    contentType: 'json',
                    data: data,
                    onsuccess: onsuccess,
                    onfail: onfail
                });
            },
            getJSON: function(url, onsuccess, onfail) {
                this.ajax({
                    url: url,
                    type: 'get',
                    contentType: 'json',
                    onsuccess: onsuccess,
                    onfail: onfail
                });
            }
        };
    })();
 })(this);
 