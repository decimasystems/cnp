export class CNP {
    constructor(private cnp: string) { }
    key: string = "279146358279";
    year = +this.cnp.substr(1, 2);
    month = +this.cnp.substr(3, 2);
    day = +this.cnp.substr(5, 2);
    listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    code = +this.cnp.substr(8, 2);
    yearLeap() {
        return ((!(this.year % 4) && this.year % 100) || !(this.year % 400));
    }
    validateM() {
        return this.month >= 1 && this.month <= 12;
    }
    validateD() {
        if (this.day == 0)
            return false;
        else
            if (this.month == 2 && this.yearLeap())
                return this.day <= this.listOfDays[this.month - 1] + 1;
            else
                return this.day <= this.listOfDays[this.month - 1];
    }
    validateCode() {
        return (this.code >= 1 && this.code <= 46 || this.code == 51 || this.code == 52);
    }
    formatValid() {
        return (this.validateM() && this.validateD() && this.validateCode());
    }
    isNumber() {
        return (/[0-9]/g).test(this.cnp);
    }
    sumC() {
        var sum = 0;
        for (var i = 0; i < this.cnp.length - 1; i++) {
            var a = +this.cnp[i];
            var b = +this.key[i];
            sum = sum + (a * b);
        }
        return sum;
    }
    valid() {
        var c: number;
        const rest = this.sumC() % 11
        if (rest < 10)
            c = rest;
        else
            c = 1;
        if (this.cnp.length == 13)
            var controlDigit = +this.cnp[12];
        return (this.isNumber() && this.formatValid() && c == controlDigit);
    }
}
