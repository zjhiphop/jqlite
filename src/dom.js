 /*
    Dom actions.
    - append/html/text etc.
 */
 (function(root){
    // No need to use jquery
    root.Ω = function(selector, context) {
        return new Ω.fn.init(selector, context);
    };

    Ω.fn = Ω.prototype = {
        constructor: Ω,
        _append: function(el, child) {
            if (typeof child === "string") {
                el.lastElementChild.insertAdjacentHTML('afterend', child);
            } else {
                el.appendChild(child);
            }
        },
        append: function(child) {
            var me = this;

            this.elements.forEach(function(el) {
                me._append(el, child);
            });

            return this;
        },
        addClass: function(el, className) {
            if (el.classList){
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }

            return this;
        },
        hasClass: function(el, className) {

        },
        _attr: function(el, config) {
            Object.keys(config).forEach(function(key) {
                el.setAttribute(key, config[key]);
            });
        },
        attr: function(key, value) {
            var me = this;
            var config = {};

            if (typeof key === "object") {
                config = key;
            } else {
                config[key] = value;
            }

            this.elements.forEach(function(el) {
                me._attr(el, config);
            });

            return this;
        },
        find: function(selector, ctx) {
            return Ω.fn.init(selector, ctx);
        },
        prop: function(name, value) {
            this.elements.forEach(function(el) {
                el[name] = value;
            });

            return this;
        },
        html: function(html) {
            this.elements[0].innerHTML = html;

            return this;
        },
        text: function(content) {
            this.elements[0].innerText = content;

            return this;
        },
        on: function(evtType, handler) {
            this.elements.forEach(function(el) {
                el.addEventlistener(evtType, handler);
            });

            return this;
        },
        emit: function(evtType) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(evtType, true, false);
            this.element[0].dispatchEvent(event);

            return this;
        }
    };

    var init = Ω.fn.init = function(selector, ctx) {
        if (!selector) {
            return this;
        }

        ctx = ctx || document;

        if (typeof selector === "string") {
            this.elements = ctx.querySelectorAll(selector);
        } else if (selector.nodeType) {
            this.elements = [selector];
        }

        this.length = (this[0] = this.elements).length;

        return this;
    };

    init.prototype = Ω.fn;
 })(this);