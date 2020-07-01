"use strict";
//this class WILL evalulate SOME integrals that do not converge
//this is because functions like (x) => {return x/x} will not encounter divide by zero errors
//if the integrate function returns NaN then it is certain that integral does not converge
//or function is ill defined, but this does not happen for all non convergent integrals /
//ill defined functions
class Integral {
    //pass in function, lower bound, upper bound, order of error
    //for romberg, error is O(h^(2n)) where h=(b-a)/2^n
    //bounds can be numbers as well as "-inf"/"inf"
    integrate(f, a, b, e) {
        //checking for TypeError
        if(typeof a != "number" && a != "inf" && a != "-inf") {
            throw new TypeError("<a> must be a number or \"inf\"/\"-inf\".");
        }
        if(typeof b != "number" && b != "inf" && b != "-inf") {
            throw new TypeError("<b> must be a number or \"inf\"/\"-inf\".");
        }
        if(!Number.isInteger(e)) {
            throw new TypeError("<e> must be an integer.");
        }
        if(a=="-inf" || b=="inf") return this._rombergImproper();
        else return this._rombergDefinite(f, a, b, e);
    }
    //calculate x^y in O(log(y)) time
    _fastPower(x, y) {
        if(y == 0) return 1;
        var sol = 1;
        while(y != 0) {
            if(y%2 == 1) {
                sol *= x;
                y--;
                continue;
            }
            x = x*x;
            y = parseInt(y/2);
        }
        return sol;
    }
    _rombergDefinite(f, a, b, e) {
        //check for edge case of 0
        if(a == b) {
            return 0;
        }
        if(a == 0) {
            a = 10e-100 * (b / Math.abs(b));
        }
        if(b == 0) {
            b = 10e-100 * (a / Math.abs(a));
        }
        //e must be even
        if(e%2 != 0) {
            e++;
        }
        //initialize h
        var h = b - a;
        //initialize flag for a flip array
        var flag = 1;
        //initialize the flip array
        var table = new Array(2);
        for(let i=0; i<2; i++) {
            table[i] = new Array(e/2+1);
        }
        table[0][1] = 4;
        for(let i=1; i<=e/2; i++) {
            //switch state
            flag = ~flag&1;
            //Simpson's rule
            table[flag][1] = (f(a)+f(b))*h/2;
            if(i != 1) {
                table[flag][1] = table[~flag&1][1]/2;
                let upperBound = this._fastPower(2, i-2);
                try{
                    for(let j=1; j<=upperBound; j++) {
                        table[flag][1] += h*f(a+(2*j-1)*h);
                    }
                } catch(err) {
                    console.log("Likely error occured due to faulty function. Consider checking domain.");
                    throw err;
                }
            }
            for(let j=2; j<=i; j++) {
                table[flag][j] = table[flag][j-1] + (table[flag][j-1]-table[~flag&1][j-1])/(this._fastPower(4, j-1)-1);
            }
            h /= 2;
        }
        return table[flag][e/2];
    }
    _rombergImproper(f, a, b, e) {
        //g(x) = f(1/x)*(-1/x^2)
        function g(x) {
            return f(1/x)*(-1/(x*x));
        }
        var invert = false;
        if(a != b && (a == "inf" || b == "-inf")) invert = true;
        if(a == "-inf" && b == "inf") {
            if(invert) {
                return -(this._rombergDefinite(f, -1, 1, e) + this._rombergDefinite(g, 0, -1, e) + this._rombergDefinite(g, 1, 0, e));
            }
            return this._rombergDefinite(f, -1, 1, e) + this._rombergDefinite(g, 0, -1) + this._rombergDefinite(g, 1, 0, e);
        }
        else {
            if(a == "-inf") {
                let newBound = b-1;
                if(newBound == 0) newBound--;
                let approxZero = 1e-100 * (newBound/Math.abs(newBound));
                if(invert) {
                    return -(this._rombergDefinite(f, newBound, b, e) + this._rombergDefinite(g, approxZero, 1/newBound, e));
                }
                return this._rombergDefinite(f, newBound, b, e) + this._rombergDefinite(g, approxZero, 1/newBound, e);
            }
            if(b == "inf") {
                let newBound = a+1;
                if(newBound == 0) newBound++;
                let approxZero = 1e-100 * (newBound/Math.abs(newBound));
                if(invert) return -(rombergDefinite(f, a, newBound, e) + rombergDefinite(g, 1/newBound, approxZero, e));
                return rombergDefinite(f, a, newBound, e) + rombergDefinite(g, 1/newBound, approxZero, e); 
            }
        }
    }
}

module.exports = new Integral();