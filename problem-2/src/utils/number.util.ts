import { isNullly } from './string.util';

/**
 * Round a decimal number to specified decimal places with this formula:
 * - result = round(decimal / 10^(decimalPlace - len)). len is number of digits of decimal
 * For example:
 * - With decimalPlace = 2 and decimal = 45612,
 * - The result gonna be  rounding 45612 / 10^(5 - 2) => 46
 */
export const roundDecimal = (decimal: number, decimalPlace: number): string => {
  // Validate arguments
  if (isNullly(decimal) || Number.isNaN(decimal)) return '';

  const decimalStr = String(decimal);
  const len = decimalStr.length;

  const divisor = Math.pow(10, len - decimalPlace);

  return Math.round(decimal / divisor)
    .toFixed(decimalPlace)
    .toString();
};

export const formatCurrency = (amount: string | number, decimalPlace?: number): string => {
  let amountStr = amount.toString();

  if (!amountStr) return '';

  // Removing unwanted characters
  amountStr = amountStr.replace(/[^0-9.-]/g, '');
  // Keep only the first dot
  amountStr = amountStr.replace(/(?<=\..*)\./g, '');

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
   * 2. Otherwise, round and pad with zeros or trim to match the specified decimalPlace
   *  */
  let formattedDecimal = decimal;
  if (decimalPlace && decimalPlace > 0) {
    formattedDecimal = roundDecimal(Number(decimal), decimalPlace);
  }

  const prefix = isNagative ? '-' : '';
  return prefix + [formattedInteger, formattedDecimal].filter(x => !!x).join('.');
};

/**
 * Validate number string based on the following options:
 * - allowDecimal: whether to allow decimal point
 * - allowNegative: whether to allow negative sign
 * The regex for number is constructed by three parts: negative part, integer part, and decimal part
 * 1. Negative part: "-?" (optional)
 * 2. Integer part: "\d*" (zero or more digits)
 * 3. Decimal part: "\.?\d*?" (optional decimal point followed by zero or more digits)
 * The final regex is built by combining these parts based on the options provided
 */
export const validateNumber = ({
  value,
  allowDecimal,
  allowNegative,
}: {
  value: string | number;
  allowNegative: boolean;
  allowDecimal: boolean;
}): boolean => {
  let valueStr = value.toString();

  const negativePart = '-?';
  const integerPart = '\\d*';
  const decimalPart = '\\.?\\d*?';

  let regexStr = '';

  if (allowNegative) {
    regexStr += negativePart;
  }

  regexStr += integerPart;

  if (allowDecimal) {
    regexStr += decimalPart;
  }
  const regex = new RegExp(`^${regexStr}$`, 'g');

  return regex.test(valueStr);
};
