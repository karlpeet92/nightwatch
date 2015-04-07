module.exports = {
  setUp: function (callback) {
    callback();
  },

  testPageObjectProperties : function(test) {
    var client = this.client = require('../nightwatch.js').init({
      page_objects_path: './extra/pageobjects'
    });

    var page = client.api.page.simplePageObj();

    test.ok('elements' in page);
    test.ok('name' in page);
    test.ok('section' in page);
    test.ok('url' in page);
    test.ok('api' in page);
    test.ok('client' in page);
    test.ok('testMixin' in page);

    test.equal(typeof page.api, 'object');
    test.equal(typeof page.client, 'object');
    test.equal(page.name, 'simplePageObj');
    test.equal(page.url, 'http://localhost.com');
    test.equal(page.testMixin(), page);

    test.ok('loginCss' in page.elements);
    test.ok('loginXpath' in page.elements);
    test.ok('signUp' in page.section);
    test.ok('help' in page.section.signUp.elements);
    test.ok('getStarted' in page.section.signUp.section);

    test.done();
  },

  testPageObjectSetSelector : function(test) {
    var client = this.client = require('../nightwatch.js').init({
      page_objects_path: './extra/pageobjects'
    });

    var page = client.api.page.simplePageObj();
    var elements = page.elements;

    test.equal(elements.loginCss.selector, '#weblogin');
    test.equal(elements.loginCss.locateStrategy, 'css selector');
    test.equal(elements.loginXpath.selector, '//weblogin');
    test.equal(elements.loginXpath.locateStrategy, 'xpath');

    test.equal(page.section.signUp.elements.help.selector, '#signupSection #helpBtn');

    test.done();
  },

  testPageObjectSetInvalidSelector : function(test) {
    var client = this.client = require('../nightwatch.js').init({
      page_objects_path: './extra/pageobjects'
    });

    test.throws(
      function() {
        var page = client.api.page.invalidPageObj();
      }, 'Combining xpath and css selectors throws an exception'
    );

    test.done();
  },

  testPageObjectAssertionsLoaded : function(test) {
    var client = this.client = require('../nightwatch.js').init({
      page_objects_path: './extra/pageobjects'
    });

    var page = client.api.page.simplePageObj();

    test.ok('assert' in page);
    test.ok('verify' in page);
    test.ok('title' in page.assert);
    test.ok('title' in page.verify);
    test.ok('containsText' in page.assert);
    test.ok('containsText' in page.verify);
    test.ok('ok' in page.assert);
    test.ok('ok' in page.verify);
    test.deepEqual(typeof page.assert.containsText, 'function');
    test.deepEqual(typeof page.verify.containsText, 'function');
    test.deepEqual(typeof page.assert.title, 'function');
    test.deepEqual(typeof page.verify.title, 'function');

    test.done();
  },

  testPageObjectCommandsLoaded : function(test) {
    var client = this.client = require('../nightwatch.js').init({
      page_objects_path: './extra/pageobjects'
    });

    var page = client.api.page.simplePageObj();

    test.ok('click' in page);
    test.ok('waitForElementPresent' in page);
    test.ok(!('end' in page));
    test.ok(!('switchWindow' in page));

    test.done();
  },

  tearDown : function(callback) {
    this.client = null;
    // clean up
    callback();
  }
};
