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

import { collectInspectionLinks } from '../src/inspectionLinkCollector';

const linkCollector = collectInspectionLinks
describe('Link Collector', function() {
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
});
