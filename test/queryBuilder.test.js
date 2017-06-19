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

import { formatDate, makeNumberTwoDigitString, convertDateToMDY, getDateAWeekPrior } from '../src/queryBuilder';

const dateFormatter = formatDate;

describe('date reformatter', function() {
    it('should exist', function() {
        assert.isDefined(dateFormatter);
    });

    it('should reject if passed a non-Date', function() {

        //WHY DOES THIS FAIL WHEN I ADD RETURN?

        assert.isRejected(dateFormatter('foo'));
    });

    it('should return a string', function() {
        const date = new Date(2017, 5, 19);
        return assert.eventually.typeOf((dateFormatter(date)), 'string');
    });
    it('should return a URL string with the proper date range as parameters', function(){
        const tests = [
            {arg: new Date(2017, 5, 19), expected: 'http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=06/12/2017&ed=06/19/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY'},
            {arg: new Date(2017, 5, 6), expected: 'http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=05/30/2017&ed=06/06/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY'},
            {arg: new Date(2017, 0, 4), expected: 'http://tx.healthinspections.us/san%20antonio/search.cfm?1=1&sd=12/28/2016&ed=01/04/2017&kw1=&kw2=&kw3=&rel1=L.licenseName&rel2=L.licenseName&rel3=L.licenseName&zc=&dtRng=YES&pre=similar&smoking=ANY'}
        
        ];
        return Promise.all([
            assert.eventually.strictEqual(dateFormatter(tests[0].arg), tests[0].expected),
            assert.eventually.strictEqual(dateFormatter(tests[1].arg), tests[1].expected),
            assert.eventually.strictEqual(dateFormatter(tests[2].arg), tests[2].expected)
            ]);
    });
});

const digitAdder = makeNumberTwoDigitString;

describe('digit adder', function() {
    it('should exist', function() {
        assert.isDefined(digitAdder);
    });

    it('should throw error if passed a non-number', function() {
        assert.throws(() => digitAdder('bar'));
        assert.throws(() => digitAdder({ foo: 'bar' }));
        assert.throws(() => digitAdder([0]));
        assert.throws(() => digitAdder(new Date()));
    });

    it('should throw error if passed a number < 1 or > 31', function() {
        assert.throws(() => digitAdder(-5));
        assert.throws(() => digitAdder(0));
        assert.throws(() => digitAdder(200));
    });

    it('should return a string', function() {
        assert.isString(digitAdder(5));
    });

    describe('string', function() {
        it('should have a length of 2', function() {
            assert.lengthOf(digitAdder(5), 2);
        });
        it('should be 0 + num if number passed is < 10', function() {
            assert.strictEqual(digitAdder(2), '02');
            assert.strictEqual(digitAdder(5), '05');
            assert.strictEqual(digitAdder(9), '09');
        });

        it('should be num cast to string if number passed is 10-31', function() {
            assert.strictEqual(digitAdder(10), '10');
            assert.strictEqual(digitAdder(25), '25');
            assert.strictEqual(digitAdder(31), '31');
        });
    });

});

const dateToMDY = convertDateToMDY;

describe('Date to MDY', function() {
    it('should exist', function() {
        assert.isDefined(dateToMDY);
    });
    it('should throw error if passed a non-Date', function() {
        assert.throws(() => dateToMDY('foo'));
        assert.throws(() => dateToMDY(1));
        assert.throws(() => dateToMDY({ foo: 'bar' }));
        assert.throws(() => dateToMDY([0]));
    });
    it('should return a string', function() {
        assert.isString(dateToMDY(new Date()));
    });
    it('should format the date mm/dd/yyyy', function() {
        const dayIWroteThis = new Date(2017, 5, 17);
        const nineEleven = new Date(2001, 8, 11);
        const fourthOfJuly = new Date(1980, 6, 4);
        assert.strictEqual(dateToMDY(dayIWroteThis), '06/17/2017');
        assert.strictEqual(dateToMDY(nineEleven), '09/11/2001');
        assert.strictEqual(dateToMDY(fourthOfJuly), '07/04/1980');
    });
});

const weekAgo = getDateAWeekPrior;

describe('Date to one week prior', function() {
    it('should exist', function() {
        assert.isDefined(weekAgo);
    });
    it('should throw error if passed a non-Date', function() {
        assert.throws(() => weekAgo('foo'));
        assert.throws(() => weekAgo(1));
        assert.throws(() => weekAgo({ foo: 'bar' }));
        assert.throws(() => weekAgo([0]));
    });
    it('should return a date', function() {
        assert.typeOf(weekAgo(new Date()), 'date');
    });
    it('should make the date 7 days in the past', function() {
        const dateToTest = new Date(2017, 5, 17);
        const expectedDate = new Date(2017, 5, 10);
        assert.strictEqual(weekAgo(dateToTest).toString(), expectedDate.toString());
    });
    it('should work when original day of month is <= 7', function() {
        const dateToTest = new Date(2017, 5, 6);
        const expectedDate = new Date(2017, 4, 30);
        assert.strictEqual(weekAgo(dateToTest).toString(), expectedDate.toString());
    });
    it('should work when the week prior is a previous year', function() {
        const dateToTest = new Date(2017, 0, 4);
        const expectedDate = new Date(2016, 11, 28);
        assert.strictEqual(weekAgo(dateToTest).toString(), expectedDate.toString());
    });
});
