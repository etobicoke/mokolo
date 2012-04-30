# mokolo

mokolo intends to become a collection of machine learning algorithms for Node.js. The current release supports only the Non-Negative Matrix Factorization (NMF)
algorithm; more are coming soon. 
Feedbacks and contributions are greatly appreciated. 

## Install
The easiest way to install mokolo is through <a href="http://www.npmjs.org" target="_blank">npm</a>, the nodejs package manager.
```
npm install mokolo
```

## Non-Negative Matrix Factorization (NMF)
NMF is an advanced technique which allows breaking down a set of numerical observations into their component parts.
It can be used in numerous fields including text mining, spectral data analysis, scalable Internet distance prediction,
non-stationary speech denoising and bioinformatics. Learn more on <a href="http://en.wikipedia.org/wiki/Non-negative_matrix_factorization" target="_blank"> Wikipedia.</a>
### Prerequisite
NMF uses extensively <a href="http://sylvester.jcoglan.com/", target="_blank">Sylvester</a>, a vector and matrix math library for JavaScript written 
by James Coglan.
If Sylvester is not already installed, npm will do it for you during mokolo's installation.

### Initialization
```
var mokolo = require('mokolo'), 
    nmf = new mokolo.NMF();
```

### Usage
```
nmf.factorize(options, callback);
```
##### options
options is a hash with the following structure.
```
{
 matrix     : M       // matrix to be factorized; e.g. a matrix object generated from an array using Sylvester  
,features   : number  // the dimensions (number x number) of the features matrix to be computed; e.g. 2
,iterations : number  // the number of iterations; e.g. 1000 
,precision  : number  // the position at which the `diff` will be rounded; e.g. 1e-15 
}
```

##### callback
callback is a function taking six (6) parameters

```
callback(W, H, WH, diff, iter, precision){
}
```
* `W` - Computed Weights matrrix
* `H` - Computed Features matrix
* `WH` - multiplication of computed matrices W and H
* `diff` - Difference between `M` and `WH` 
* `iter` - number of iterations needed to get `WH` close enough to `M`
* `precision` - same as above 

### Example
Given the following dataset represented by an array of arrays 
```
var dArray;
dArray = [
    [29, 29],
    [43, 33],
    [15, 25],
    [40, 28],
    [24, 11],
    [29, 29],
    [37, 23],
    [21, 6]
];

```
Using Sylvester a matrix can be generated from the array above.

```
var $M = require('sylvester').Matrix.create;
var D = $M(dArray);
```
Now factorization can start.
```
nmf.factorize({
        matrix: D
       ,features: 2
       ,iterations: 1000
       ,precision: 1e-10
    }, 
    function(W, H, WH, diff, iter, precision){
        console.log('Weights matrix');
        console.log(W)
        console.log('Features matrix');
        console.log(H);
        console.log('Computed matrix');
        console.log(WH);
        console.log(iter);
        console.log(diff);
    }
);
```

## TO DO
* Set default values to NMF parameters
* More test coverage
* Support for more algorithms; e.g. clustering, K-nearest neighbors, etc.