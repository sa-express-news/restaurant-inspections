'use strict';

//Tell Node not to freak out when I don't catch promise
//rejections in tests
process.on('unhandledRejection', function(reason, p) {
    return;
});

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;

import { collectPages } from '../src/inspectionPageCollector';

describe('Page collector', function() {
    this.timeout(100000);

    const urlString = 'http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=06/12/2017&ed=06/19/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY';

    it('should exist', function() {
        assert.isDefined(collectPages);
    });
    it('should reject if passed a non-string', function() {
        assert.isRejected(collectPages(0));
        assert.isRejected(collectPages({ foo: 'bar' }));
        assert.isRejected(collectPages(new Date()));
        assert.isRejected(collectPages([0, 5]));
    });
    it.skip('should return an array', function() {
        return assert.eventually.typeOf(collectPages(urlString), 'array');
    });
    describe.skip('results', function() {

        let results;
        beforeEach(function() {
            return collectPages(urlString)
                .then((result) => {
                    results = result;
                });
        });
        it('should be an array of strings', function() {
            results.forEach(function(item) {
                assert.typeOf(item, 'string');
            });
        });
        it('each string should be a search URL', function() {
            results.forEach(function(item) {
                assert.include(item, 'search.cfm?start=');
            });
        });
    });

});
