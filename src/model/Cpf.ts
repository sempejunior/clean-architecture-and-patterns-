export class Cpf {

    cpf: string;
    readonly FACTOR_DIGIT_1 = 10;
    readonly FACTOR_DIGIT_2 = 11;
    readonly MAX_DIGITS_1 = 9;
    readonly MAX_DIGITS_2 = 10;

    constructor(cpf: string) {
        this.cpf = cpf;
    }


    public validate(): boolean {

        this.cpf = this.extractDigits(this.cpf);
        if (this.isInvalidLength(this.cpf)) return false;
        if (this.isBlocked(this.cpf)) return false;
        const digit1 = this.calculateDigit(this.cpf, this.FACTOR_DIGIT_1, this.MAX_DIGITS_1);
        const digit2 = this.calculateDigit(this.cpf, this.FACTOR_DIGIT_2, this.MAX_DIGITS_2);
        let calculatedCheckDigit = `${digit1}${digit2}`;
        return this.getCheckDigit(this.cpf) == calculatedCheckDigit;
    }

    private calculateDigit(cpf: string, factor: number, max: number): number {
        let total = 0;
        for (const digit of this.toDigitArray(cpf).slice(0, max)) {
            total += digit * factor--;
        }
        return (total % 11 < 2) ? 0 : (11 - total % 11);
    }

    private extractDigits(cpf: string): string {
        return cpf.replace(/\D/g, "");
    }

    private isInvalidLength(cpf: string): boolean {
        return cpf.length !== 11;
    }

    private isBlocked(cpf: string): boolean {
        const [digit1] = cpf;
        return cpf.split("").every(digit => digit === digit1);
    }

    private toDigitArray(cpf: string): number[] {
        return [...cpf].map(digit => parseInt(digit));
    }

    private getCheckDigit(cpf: string): string {
        return cpf.slice(9);
    }


}