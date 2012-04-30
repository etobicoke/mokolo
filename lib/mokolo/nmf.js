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

var matrix = require('sylvester');
var $U = matrix.Matrix;

var dif_cost = require('./util/diff_cost').diff_cost;
var matrix_to_array_to_matrix = require('./util/matrix_to_array_to_matrix').matrix_to_array_to_matrix;


var NMF = function(){};

NMF.prototype.factorize = function (options, callback) {

    var M = options.matrix;
    var fMatrix = options.features;
    var precision = options.precision;
    var iter = options.iterations;

    var dim = M.dimensions();

    // Initialize the weight and feature matrices with random values
    var W = $U.Random(dim.rows, fMatrix), H = $U.Random(fMatrix, dim.cols);
    var i = 0;
    var WH = W.x(H);
    var diff = dif_cost(M, WH);

    while (diff > precision) {
        i++;
        WH = W.x(H);

        //calculate the current difference
        diff = dif_cost(M, WH);

        //Terminate if the matrix has been fully factorized
        if (diff === 0) break;

        //Terminate if the number of iterations is exhausted
        if(i > iter) break;

        var HN = (W.transpose()).x(M);
        var HD = ((W.transpose()).x(W)).x(H);

        H = matrix_to_array_to_matrix(H, HN, HD);

        //update weights matrix
        var WN = M.x(H.transpose());
        var WD = W.x(H.x(H.transpose()));

        W = matrix_to_array_to_matrix(W, WN, WD);

    }
    callback(W, H, W.x(H), diff, i, precision);
};

module.exports = NMF;
