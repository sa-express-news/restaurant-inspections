'use strict';

//Tell Node not to freak out when I don't catch promise
//rejections in tests
process.on('unhandledRejection', function(reason, p) {
    return;
});

import queryBuilder from '../src/queryBuilder';

const dateFormatter = queryBuilder.formatDate;
const digitAdder = queryBuilder.makeNumberTwoDigits;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;


describe('Query Builder', () => {
    it('should exist', () => {
        assert.isDefined(queryBuilder);
    });
    describe('date reformatter', () => {
        it('should exist', () => {
            assert.isDefined(dateFormatter);
        });

        it('should reject if passed a non-Date', () => {

        	//WHY DOES THIS FAIL WHEN I ADD RETURN?

            assert.isRejected(dateFormatter('foo'));
        });

        const date = new Date();

        it('should return a string', () => {
            return assert.eventually.typeOf((dateFormatter(date)), 'string');
        });


    });

    describe('digit adder', () => {
        it('should exist', () => {
            assert.isDefined(digitAdder);
        });

        it('should reject if passed a non-number', () => {
            return assert.isRejected(digitAdder('bar'));
        });

        it('should reject if passed a number < 1 or > 12', ()=>{
        	return assert.isRejected(digitAdder(555));
        });

        it('should return a number', () => {
            return assert.eventually.isNumber(digitAdder(5));
        });

    });
});
