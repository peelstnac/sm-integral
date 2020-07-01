# sm-integral
[![Build Status](https://travis-ci.org/peelstnac/sm-integral.svg?branch=master)](https://travis-ci.org/peelstnac/sm-integral)
---
Compute definite and improper integrals with Romberg Integration. Easily and accurately integrate JavaScript functions.

## Features
* Easily evaluate definite and improper integrals.
* Control the degree of accuracy (see "Accuracy").
* Fast computation time (see "Tests").
* Divide-by-zero safeguard.

## Install
```
npm install sm-integral
```

## Usage
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
* ```a``` is the lower bound of the integral (can either be a number or "inf"/"-inf").
* ```b``` is the upper bound of the integral (can either be a number or "inf"/"-inf").
* ```e``` is the order of accuracy. Its default value is 18, which can evaluate most integrals up to at least +-1e-9 accuracy (see "Tests").
