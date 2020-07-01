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
    <img src="https://latex.artofproblemsolving.com/4/7/e/47e81fa35f8c2401c79087841c9277b23a5f2755.png" width="150"/>
</p>
and
<p align="center">
    <img src="https://latex.artofproblemsolving.com/5/4/d/54dc7c6321193d06abd2dc1016fbf74fddf7a8e5.png" width="150"/>
</p>
respectively.

```js
const Integral = require('sm-integral');

//definite function to integrate
function f (x) {
    return 1 / (x * x);
}

//definite integral
console.log(Integral.integrate(f, 5, 10)); //0.1

//improper integral
console.log(Integral.integrate(f, "-inf", -10)); //0.1
```

## Configuration

The integrate() function has the following parameters.

```js
class Integrate {
    //...
    integrate(f, a, b, e = 18) {
        //...
    }
}
```
* ```f``` is the JavaScript function to be integrated.
* ```a``` is the lower bound of the integral (must either be a number or "inf"/"-inf").
* ```b``` is the upper bound of the integral (must either be a number or "inf"/"-inf").
* ```e``` is the order of accuracy (must be a positive even integer - if it is odd, it will be incremented). The default value of 18 is enough to evaluate most integrals to at least +-1e-9 accuracy (see "Tests").

## Tests
In the test folder, 8 integrals are tested with the default ```e=18``` parameter. The 8 evaluations were completed within 30ms, each producing results accurate to at least +-1e-9.

### Order of Accuracy
To have an order of accuracy ```e``` means that the ```returnedValue``` when computing
<p align="center">
    <img src="https://latex.artofproblemsolving.com/6/b/6/6b67859a166c3d448ebb0221e5491fbebda93e98.png" width="100"/>
</p>
satisfies
<p align="center">
    <img src="https://latex.artofproblemsolving.com/5/0/2/502320d69fd37d1fda35584be759b655438c71e8.png" width="500"/>
</p>
. Note that for improper integrals, the substitution y=1/x is made.

