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

import { collectInspectionLinks, isString, deduplicateArray, isInspectionLink } from '../src/inspectionLinkCollector';

const searchArray = ['http://tx.healthinspections.us/san%20antonio/search.cfm?start=1&1=1&sd=05/21/2017&ed=06/20/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY'];

const linkCollector = collectInspectionLinks;

describe('Link Collector', function() {
    this.timeout(1000000);
    it('should exist', function() {
        assert.isDefined(linkCollector);
    });
    it('should reject if not passed an array', function() {
        return Promise.all([
            assert.isRejected(linkCollector('foo')),
            assert.isRejected(linkCollector(555)),
            assert.isRejected(linkCollector({ foo: 'bar' })),
            assert.isRejected(linkCollector(new Date()))
        ]);
    });
    it('should reject if not passed an array of strings', function() {
        return Promise.all([
            assert.isRejected(linkCollector([0, 1, 2, 3])),
            assert.isRejected(linkCollector('hi', new Date(), 55))
        ]);
    });
    it('should reject if any of the strings is not a search link', function() {
        return Promise.all([
            assert.isRejected(linkCollector(['foo', 'bar'])),
            assert.isRejected(linkCollector(['https://google.com', 'https://kiafarhang.com']))
        ]);
    });
    it.skip('should return an array', function() {
        return assert.eventually.isArray(linkCollector(searchArray));
    });

    describe('String checker utility', function() {
        it('should exist', function() {
            assert.isDefined(isString);
        });
        it('should return true when passed strings', function() {
            const arrayOfStrings = ['foo', 'bar', 'blah'];

            arrayOfStrings.forEach(function(string) {
                assert.isTrue(isString(string));
            });
        });
        it('should return false when passed non-strings', function() {
            const arrayOfStuff = [1, new Date(), { foo: 'bar' },
                ['blah', 'foo']
            ];

            arrayOfStuff.forEach(function(thing) {
                assert.isNotTrue(isString(thing));
            });
        });
    });

    describe('Array deduplicator utility', function() {
        it('should exist', function() {
            assert.isDefined(deduplicateArray);
        });
        it('should throw an error if passed a non-array', function() {
            assert.throws(() => deduplicateArray('foo'));
            assert.throws(() => deduplicateArray(5));
            assert.throws(() => deduplicateArray({ foo: 'bar' }));
            assert.throws(() => deduplicateArray(null));
        });
        it('should remove duplicates from an array', function() {
            const numArray = [0, 1, 0, 1, 0, 1];
            const dedupNumArray = deduplicateArray(numArray);

            const stringArray = ['foo', 'foo', 'foo', 'bar', 'bar', 'bar'];
            const dedupStringArray = deduplicateArray(stringArray);

            assert.notDeepEqual(numArray, dedupNumArray);
            assert.notDeepEqual(stringArray, dedupStringArray);
        });
    });

    describe('Inspection link checker utility', function() {
        it('should exist', function() {
            assert.isDefined(isInspectionLink);
        });
        it('should return true when passed inspection links', function() {
            const arrayOfInspectionLinks = [
                'http://tx.healthinspections.us/san%20antonio/estab.cfm?licenseID=895968&inspectionID=1070467',
                'http://tx.healthinspections.us/san%20antonio/estab.cfm?licenseID=647165&inspectionID=1067561',
                'http://tx.healthinspections.us/san%20antonio/estab.cfm?licenseID=622606&inspectionID=1070232',
            ];

            arrayOfInspectionLinks.forEach(function(link) {
                assert.isTrue(isInspectionLink(link));
            });
        });
        it('should return false when passed non-inspection links', function() {
            const arrayOfBadLinks = [
                'http://tx.healthinspections.us/san%20antonio/signup.cfm',
                'http://tx.healthinspections.us/san%20antonio/search.cfm?searchShow=zip',
                'http://tx.healthinspections.us/san%20antonio/signup.cfm',
                'http://tx.healthinspections.us/san%20antonio/search.cfm?searchShow=name'
            ];

            arrayOfBadLinks.forEach(function(badLink) {
                assert.isNotTrue(isInspectionLink(badLink));
            });
        });
    });

    describe.skip('results', function() {
        let results;

        beforeEach(function() {
            return linkCollector(searchArray)
                .then((result) => {
                    results = result;
                });
        });

        it('should each be a string', function() {
            results.forEach(function(item) {
                assert.typeOf(item, 'string');
            });
        });
        it('should each look like a search URL', function() {
            results.forEach(function(item) {
                assert.include(item, 'http://tx.healthinspections.us/san%20antonio/estab.cfm?');
            });
        });
        it('should contain no duplicates', function() {
            let copy = [];
            let set = new Set(results);
            for (let item of set) copy.push(item);
            assert.strictEqual(results.length, copy.length);
        });
    });
});
