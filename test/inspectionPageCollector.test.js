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

import { collectPages, isInspectionPageLink } from '../src/inspectionPageCollector';

describe('Page collector', function() {
    this.timeout(100000);

    const urlString = 'http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=06/12/2017&ed=06/19/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY';

    it('should exist', function() {
        assert.isDefined(collectPages);
    });
    it('should reject if passed a non-string', function() {
        return Promise.all([
            assert.isRejected(collectPages(0)),
            assert.isRejected(collectPages({ foo: 'bar' })),
            assert.isRejected(collectPages(new Date())),
            assert.isRejected(collectPages([0, 5]))
        ]);
    });
    it.skip('should return an array', function() {
        return assert.eventually.typeOf(collectPages(urlString), 'array');
    });
    describe('Search page link validator', function() {
        it('should exist', function() {
            assert.isDefined(isInspectionPageLink);
        });
        it('should return true when passed a search page link', function() {
            assert.isTrue(isInspectionPageLink('http://tx.healthinspections.us/san%20antonio/search.cfm?start=11&1=1&sd=06/08/2017&ed=06/15/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY'));
        });
        it('should return false when passed a non-search page link', function() {
            const arrayOfBadLinks = [
                'http://tx.healthinspections.us/san%20antonio/search.cfm?searchShow=name',
                'http://tx.healthinspections.us/san%20antonio/estab.cfm?licenseID=7593&inspectionID=1070879',
                'http://tx.healthinspections.us/san%20antonio/signup.cfm',
                'https://google.com'
            ];

            arrayOfBadLinks.forEach(function(link) {
                assert.isNotTrue(isInspectionPageLink(link));
            });
        });
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
                assert.include(item, 'search.cfm?');
            });
        });
    });

});
