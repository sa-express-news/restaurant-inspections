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
const expect = chai.expect;


// describe('Query Builder', () => {
//     it('should exist', () => {
//         assert.isDefined(queryBuilder);
//     });
//     describe('date reformatter', () => {
//         it('should exist', () => {
//             assert.isDefined(dateFormatter);
//         });

//         it('should reject if passed a non-string', () => {
//             assert.isRejected(dateFormatter('foo'));
//         });

//         const date = new Date();

//         it('should return a string', () => {
//             assert.eventually.typeOf((dateFormatter(date)), 'string');
//         });


//     });

//     describe('digit adder', () => {
//         it('should exist', () => {
//             assert.isDefined(digitAdder);
//         });

//         // it('should reject if passed a non-number', () =>{
//         // 	assert.isRejected(digitAdder('bar'));
//         // });

//         it('should return a number', () => {
//             expect(Promise.resolve('asdasd')).to.eventually.be.a('number');
//         });
//         it('should returasdasdasdn a number', () => {
//             expect('asdasd').to.be.a('number');
//         });
//     });
// });

describe('Number promise test', ()=>{
	it('should fail', ()=>{
		assert.isNumber('asd');
	});
	it('should pass', ()=>{
		assert.isNumber(55);
	});
	it('should fail', ()=>{
		assert.eventually.isNumber(Promise.resolve('string'));
	});
	it('should pass', ()=>{
		assert.eventually.isNumber(Promise.resolve(6));
	});
})