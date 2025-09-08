function ConvertHandler() {
  /**
  You can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)
  All incoming units should be accepted in both upper and lower case, but should be returned in both the initUnit and returnUnit in lower case, except for liter, which should be represented as an uppercase 'L'.
   */
  this.getNum = function(input) {
    let result;
    // Fraction regex to match numbers and fractions, e.g.: 1/2, 3/4, 5.5/2, 3/5
    const fractionRegex = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?$/;
    const num = input.replace(/[a-zA-Z]/g, '').trim();
    if (num === '') {
      result = 1; // Default to 1 if no number is provided
    } else if (fractionRegex.test(num)) {
      if (num.includes('/')) {
        const [numerator, denominator] = num.split('/');
        if (denominator === undefined || denominator === '0') {
          result = undefined; // Invalid if denominator is missing or zero
        } else {
          result = parseFloat(numerator) / parseFloat(denominator);
        }
      } else {
        result = parseFloat(num);
      }
    } else {
      result = undefined; // Invalid number format
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    // Extract the unit part from the input
    // Remove all digits and dots and possible fractions to isolate the unit
    const unit = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
    switch (unit) {
      case 'gal':
        result = 'gal';
        break;
      case 'L': case 'l':
        result = 'L';
        break;
      case 'lbs':
        result = 'lbs';
        break;
      case 'kg':
        result = 'kg';
        break;
      case 'mi':
        result = 'mi';
        break;
      case 'km':
        result = 'km';
        break;
      default:
        result = undefined; // Invalid unit
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L': case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = undefined;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L': case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = undefined;
    }
    return result;
  };

  this.getPluralUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L': case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = undefined;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L': case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    // Round the result to 5 decimal places
    // Math.round(result * 100000) / 100000
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (initNum === undefined && initUnit === undefined) {
      return 'invalid number and unit';
    }
    else if (initNum === undefined) {
      return 'invalid number';
    }
    else if (initUnit === undefined) {
      return 'invalid unit';
    }
    else {
      result = `${initNum} ${this.getPluralUnit(initUnit)} converts to ${returnNum} ${this.getPluralUnit(returnUnit)}`;
    }
    return result;
  };
}

module.exports = ConvertHandler;
