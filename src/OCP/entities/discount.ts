export abstract class Discount {
    constructor(public discount: number) {}
    abstract calculate(amount: number): number;
}

export class PercentDiscount extends Discount {
    calculate(amount: number): number {
        return amount - (amount * this.discount) / 100;
    }
}

export class FixedDiscount extends Discount {
    calculate(amount: number): number {
        return amount - this.discount;
    }
}
