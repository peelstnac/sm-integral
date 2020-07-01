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

//definite integrals

function f(x) {
    return 1/(x*x);
}

console.log(Integral.integrate(f, 5, 10));

function g(x) {
    return Math.pow(Math.E, 1/(x*x));
}

console.log(Integral.integrate(g, 1, 4));

//improper integral

console.log(Integral.integrate(f, "-inf", -10));
```