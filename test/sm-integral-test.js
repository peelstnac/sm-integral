const assert = require("chai").assert;
const Integral = require("../src/sm-integral");

//e=18 for all tests

describe("sm-integral", () => {
    it("Integrating the constant function f(x)=x/x exactly.", () => {
        function f(x) {
            return x/x; //1
        }
        assert.equal(Integral.integrate(f, 0, 10, 18), 10, "Evaluate constant function f(x)=x/x without error.");
    });
    it("Integrating the constant function f(x)=x/x exactly, but with a > b.", () => {
        function f(x) {
            return x/x; // 1
        }
        assert.equal(Integral.integrate(f, 5, -20, 18), -25, "Evaluate constant function f(x)=x/x without error where a > b.");
    });
    it("Integrating the linear function f(x)=0.28*x-127 exactly.", () => {
        function f(x) {
            return 0.28*x-127;
        }
        assert.equal(Integral.integrate(f, -100, 500, 18), -42600, "Evaluate linear function f(x)=0.28*x+127 without error.");
    });
    it("Integrating the quadratic function f(x)=0.56*x*x+0.7*x+17 with order of accuracy of 18.", () => {
        function f(x) {
            return 0.7*x*x+0.56*x+17;
        }
        assert.closeTo(Integral.integrate(f, 5, 13, 18), 659+59/75, 1e-12, "Evaluate quadratic function f(x)=0.7*x*x+0.56*x+17 with"
        + " order of accuracy 18.");
    });
    it("Integrating the cubic function f(x)=56.1*x*x*x-2*x+1 with order of accuracy of 18.", () => {
        function f(x) {
            return 56.1*x*x*x-2*x+1;
        }
        assert.closeTo(Integral.integrate(f, -2, 21, 18), 2726957+5/8, 1e-9, "Evaluate cubic function f(x)=56.1*x*x*x-2*x+1 with"
        + " order of accuracy 18.");
    });
    it("Integrating the error function with order of accuracy 18.", () => {
        function f(x) {
            return Math.pow(Math.E, 1/(x*x));
        }
        assert.closeTo(Integral.integrate(f, 1, 4, 18), 3.954384577738, 1e-12, "Evaluate error function with"
        + " order of accuracy 18.");
    });
});