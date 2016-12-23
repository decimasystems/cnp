export declare class CNP {
    private cnp;
    private listOfDays;
    private key;
    private year;
    private month;
    private day;
    private code;
    constructor(cnp: string);
    private readonly isLeapYear;
    private readonly isMonthValid;
    private readonly isDayValid;
    private readonly isCountyCodeValid;
    private readonly isNumber;
    private readonly sumOfDigits;
    private readonly isControlDigitValid;
    readonly isValid: boolean;
}
