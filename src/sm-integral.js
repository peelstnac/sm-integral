class Integral {
    //there are two possible types: romberg and carlo
    constructor(type) {
        this.type = type;
    }
    //pass in function, lower bound, upper bound, order of error
    //for romberg, error is O(h^(2n)) where h=(b-a)/2^n
    //bounds can be numbers as well as "-inf"/"inf"
    integrate(f, a, b, e) {
        //calculate x^y in O(log(y)) time
        function fastPower(x, y) {
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
        function rombergDefinite() {
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
            console.log(f(4));
            for(let i=1; i<=e/2; i++) {
                //switch state
                flag = ~flag&1;
                console.log(flag);
                //Simpson's rule
                table[flag][1] = (f(a)+f(b))*h/2;
                if(i != 1) {
                    table[flag][1] = table[~flag&1][1]/2;
                    let upperBound = fastPower(2, i-2);
                    for(let j=1; j<=upperBound; j++) {
                        table[flag][1] += h*f(a+(2*j-1)*h);
                    }
                }
                for(let j=2; j<=i; j++) {
                    table[flag][j] = table[flag][j-1] + (table[flag][j-1]-table[~flag&1][j-1])/(fastPower(4, j-1)-1);
                }
                h /= 2;
            }
            return table[flag][e/2];
        }
        function rombergImproper() {

        }
        function carloDefinite() {
            
        }
        function carloImproper() {

        }
    }
}