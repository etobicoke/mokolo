/*
 Copyright (c) 2012, Gustave Nganso

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var expect = require('expect.js');

var nmf = require('../lib/mokolo').nmf;
var dif_cost = require('../lib/mokolo/matrix_op/dif_cost.js').dif_cost;
var fArray = [[29,29],[43,33],[15,25],[40,28],[24,11],[29,29],[37,23],[21,6]];
var $M = require('sylvester').Matrix.create;
var F = $M(fArray);

describe('Non-Negative Matrix Factorization', function () {
    it('can factorize', function (done) {
        var factorized = nmf.factorize(F, 2, 100);
        var WH, dif;
        WH = factorized[0];
        dif = dif_cost(F, WH);
        expect(dif).to.be.lessThan(1e-27);
        done();
    });
});