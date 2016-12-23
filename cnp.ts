export class CNP {
    private listOfDays: number[];
    private key: string;
    private year: number;
    private month: number;
    private day: number;
    private code:number;

    constructor(private cnp: string) {
        this.listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.key = "279146358279";
        this.year = +this.cnp.substr(1, 2);
        this.month = +this.cnp.substr(3, 2);
        this.day = +this.cnp.substr(5, 2);
        this.code = +this.cnp.substr(7, 2);
    }
    private get isLeapYear() {
        var ret = (!(this.year % 4) && this.year % 100) || !(this.year % 400);
        return ret;
    }
    private get isMonthValid() {
        var ret = this.month >= 1 && this.month <= 12;
        return ret;
    }
    private get isDayValid() {
        if (this.day == 0)
            return false;
        else
            if (this.month == 2 && this.isLeapYear)
                return this.day <= this.listOfDays[this.month - 1] + 1;
            else
                return this.day <= this.listOfDays[this.month - 1];
    }
    private get isCountyCodeValid() {
        var ret = this.code >= 1 && this.code <= 46 || this.code == 51 || this.code == 52;
        return ret;
    }

    private get isNumber() {
        var ret = (/[0-9]/g).test(this.cnp);
        return ret;
    }
    private get sumOfDigits() {
        var sum = 0;
        for (var i = 0; i < this.cnp.length - 1; i++) {
            var a = +this.cnp[i];
            var b = +this.key[i];
            sum = sum + (a * b);
        }
        return sum;
    }

    private get isControlDigitValid() {
        var ret = false;
        var control;
        const rest = this.sumOfDigits % 11
        control = rest < 10 ? rest : 1;
        if (this.cnp.length == 13) {
            var controlDigit = +this.cnp[12];
            ret = control == controlDigit;
        }
        return ret;
    }

    public get isValid() {
        var ret = false;
        if (this.isNumber && this.isMonthValid && this.isDayValid && this.isCountyCodeValid) {
            ret = this.isControlDigitValid;
        }
        return ret;
    }

}
