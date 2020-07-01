# sm-integral
[![Build Status](https://travis-ci.org/peelstnac/sm-integral.svg?branch=master)](https://travis-ci.org/peelstnac/sm-integral)
---

Compute definite and improper integrals with Romberg Integration. Easily and accurately integrate JavaScript functions.

## Features

* Easily evaluate definite and improper integrals.
* Control the order of accuracy (see "Order of Accuracy").
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
class Integral {
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

## Order of Accuracy

To have an order of accuracy ```e``` means that the ```returnedValue``` when computing
<p align="center">
    <img src="https://latex.artofproblemsolving.com/6/b/6/6b67859a166c3d448ebb0221e5491fbebda93e98.png" width="100"/>
</p>
satisfies
<p align="center">
    <img src="https://latex.artofproblemsolving.com/5/0/2/502320d69fd37d1fda35584be759b655438c71e8.png" width="500"/>
</p>
Note that for improper integrals, the substitution y=1/x is made.

## Tests

In the test folder, 8 integrals are tested with the default ```e=18``` parameter. The 8 evaluations were completed within 30ms, each producing results accurate to at least +-1e-9.

```js
describe('sm-integral', () => {
  it('Integrating the constant function f(x)=x/x exactly.', () => {
    function f (x) {
      return x / x; // 1
    }
    assert.equal(Integral.integrate(f, 0, 10, 18), 10,
      'Evaluate constant function f(x)=x/x without error.');
  });
  it('Integrating the constant function f(x)=x/x exactly, but with a > b.', () => {
    function f (x) {
      return x / x; // 1
    }
    assert.equal(Integral.integrate(f, 5, -20, 18), -25,
      'Evaluate constant function f(x)=x/x without error where a > b.');
  });
  it('Integrating the linear function f(x)=0.28*x-127 exactly.', () => {
    function f (x) {
      return 0.28 * x - 127;
    }
    assert.equal(Integral.integrate(f, -100, 500, 18), -42600,
      'Evaluate linear function f(x)=0.28*x+127 without error.');
  });
  it('Integrating the quadratic function f(x)=0.56*x*x+0.7*x+17 with order of accuracy of 18.', () => {
    function f (x) {
      return 0.7 * x * x + 0.56 * x + 17;
    }
    assert.closeTo(Integral.integrate(f, 5, 13, 18), 659 + 59 / 75, 1e-9,
      'Evaluate quadratic function f(x)=0.7*x*x+0.56*x+17 with' +
      ' order of accuracy 18.');
  });
  it('Integrating the quadratic function f(x)=1/(x*x).', () => {
    function f (x) {
      return 1 / (x * x);
    }
    assert.closeTo(Integral.integrate(f, 5, 10, 18), 0.1, 1e-9,
      'Evaluate quadratic function f(x)=1/(x*x)' +
      'with order of accuracy 18.');
  });
  it('Integrating the cubic function f(x)=56.1*x*x*x-2*x+1 with order of accuracy of 18.', () => {
    function f (x) {
      return 56.1 * x * x * x - 2 * x + 1;
    }
    assert.closeTo(Integral.integrate(f, -2, 21, 18), 2726957 + 5 / 8, 1e-9,
      'Evaluate cubic function f(x)=56.1*x*x*x-2*x+1 with' +
      ' order of accuracy 18.');
  });
  it('Integrating the error function with order of accuracy 18.', () => {
    function f (x) {
      return Math.pow(Math.E, 1 / (x * x));
    }
    assert.closeTo(Integral.integrate(f, 1, 4, 18), 3.954384577738, 1e-9,
      'Evaluate error function with' +
      ' order of accuracy 18.');
  });
  it('Testing improper integral on f(x)=1/(x*x)', () => {
    function f (x) {
      return 1 / (x * x);
    }
    assert.closeTo(Integral.integrate(f, '-inf', -10, 18), 0.1, 1e-9,
      'Evaluate improper integral of' +
      ' f(x)=1/(x*x) with order of accuracy 18.');
  });
});
```