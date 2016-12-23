"use strict";
var CNP = (function () {
    function CNP(cnp) {
        this.cnp = cnp;
        this.key = "279146358279";
        this.year = +this.cnp.substr(1, 2);
        this.month = +this.cnp.substr(3, 2);
        this.day = +this.cnp.substr(5, 2);
        this.listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.code = +this.cnp.substr(8, 2);
    }
    CNP.prototype.yearLeap = function () {
        return ((!(this.year % 4) && this.year % 100) || !(this.year % 400));
    };
    CNP.prototype.validateM = function () {
        return this.month >= 1 && this.month <= 12;
    };
    CNP.prototype.validateD = function () {
        if (this.day == 0)
            return false;
        else if (this.month == 2 && this.yearLeap())
            return this.day <= this.listOfDays[this.month - 1] + 1;
        else
            return this.day <= this.listOfDays[this.month - 1];
    };
    CNP.prototype.validateCode = function () {
        return (this.code >= 1 && this.code <= 46 || this.code == 51 || this.code == 52);
    };
    CNP.prototype.formatValid = function () {
        return (this.validateM() && this.validateD() && this.validateCode());
    };
    CNP.prototype.isNumber = function () {
        return (/[0-9]/g).test(this.cnp);
    };
    CNP.prototype.sumC = function () {
        var sum = 0;
        for (var i = 0; i < this.cnp.length - 1; i++) {
            var a = +this.cnp[i];
            var b = +this.key[i];
            sum = sum + (a * b);
        }
        return sum;
    };
    CNP.prototype.valid = function () {
        var c;
        var rest = this.sumC() % 11;
        if (rest < 10)
            c = rest;
        else
            c = 1;
        if (this.cnp.length == 13)
            var controlDigit = +this.cnp[12];
        return (this.isNumber() && this.formatValid() && c == controlDigit);
    };
    return CNP;
}());
exports.CNP = CNP;
