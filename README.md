# sm-integral
[![Build Status](https://travis-ci.org/peelstnac/sm-integral.svg?branch=master)](https://travis-ci.org/peelstnac/sm-integral)
---
Compute definite and improper integrals with Romberg Integration. Easily and accurately integrate JavaScript functions.

## Features
* Easily evaluate definite and improper integrals.
* Control the degree of accuracy (see "Tests").
* Fast computation time (see "Tests").
* Divide-by-zero safeguard.

## Install
```
npm install sm-integral
```

## Usage
Below, we demonstrate how to evaluate the following integrals:
<p align="center">
    <img src="https://latex.artofproblemsolving.com/4/7/e/47e81fa35f8c2401c79087841c9277b23a5f2755.png"/>
</p>
and
<p align="center">
    <img src="https://latex.artofproblemsolving.com/5/4/d/54dc7c6321193d06abd2dc1016fbf74fddf7a8e5.png"/>
</p>
respectively.
```js
const Integral = require('sm-integral');

//definite function to integrate
function f(x) {
    return 1/(x*x);
}

//definite integral
console.log(Integral.integrate(f, 5, 10));

//improper integral
console.log(Integral.integrate(f, "-inf", -10));
```

## Configuration
The integrate() function has the following parameters.
```js
class Integrate {
    //...
    integrate(f, a, b, e=18) {
        //...
    }
}
```
* ```f``` is the JavaScript function to be integrated.
* ```a``` is the lower bound of the integral (must either be a number or "inf"/"-inf").
* ```b``` is the upper bound of the integral (must either be a number or "inf"/"-inf").
* ```e``` is the order of accuracy (must be a positive even integer - if it is odd, it will be incremented). The default value of 18 is enough to evaluate most integrals to at least +-1e-9 accuracy (see "Tests").

## Tests
Coming soon.
