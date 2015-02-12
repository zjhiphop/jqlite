/*
 Ajax test
 * */
describe('jqLite Ajax', function() {
    var xhr= window.Ω.xhr;

    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should return json when called by getJSON", function() {
        var doneFn = jasmine.createSpy("success");

        xhr.getJSON('cool/url', doneFn);

        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": '{"succeed": "yes"}'
        });

        expect(doneFn).toHaveBeenCalledWith({succeed: "yes"});
    });

    it("should return string when called by get", function() {
        var doneFn = jasmine.createSpy("success");

        xhr.get('cool/url', doneFn);

        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": '{"succeed": "yes"}'
        });

        expect(doneFn).toHaveBeenCalledWith('{"succeed": "yes"}');
    });

    it("should return json when called by post", function() {
        var doneFn = jasmine.createSpy("success");

        xhr.post('cool/url', {test: 123}, doneFn);

        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": '{"status":"success"}'
        });

        expect(doneFn).toHaveBeenCalledWith({"status":"success"});
    });
});