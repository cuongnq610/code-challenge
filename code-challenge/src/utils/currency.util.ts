import { isNullly } from "./string";

export const formatCurrency = (amount: string | number, decimalPlace?: number): string => {
    let amountStr = amount.toString();

    if (!amountStr) return ""

    console.log({ amountStr })
    // Removing unwanted characters 
    amountStr = amountStr.replace(/[^0-9.-]/g, "");
    // Keep only the first dot
    amountStr = amountStr.replace(/(?<=\..*)\./g, "");

    // Split amount string into integer and decimal parts
    const [integer, decimal] = amountStr.split('.');

    // Check nagative number
    const isNagative = integer.startsWith('-');
    const absInteger = isNagative ? integer.slice(1) : integer;

    // Format interger part with commas
    const formattedInteger = absInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    /**
     * Handle decimal part by the following rule:
     * 1. If decimalPlace is not provided or smaller than 0, keep the original decimal part
     * 2. Otherwise, pad with zeros or trim to match the specified decimalPlace
     *  */
    let formattedDecimal = decimal;
    if (decimalPlace && decimalPlace > 0) {
        formattedDecimal = (decimal || '').padEnd(decimalPlace, '0').slice(0, decimalPlace);
    }

    console.log({ formattedInteger, formattedDecimal })

    const prefix = isNagative ? '-' : '';
    return prefix + [formattedInteger, formattedDecimal].filter(x => !isNullly(x)).join('.');
}  