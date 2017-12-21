// Reference: https://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796 
window.__equations = (function () {    
  var __equations = {
    afterTaxDeposit: function (deposit, taxRate) {
    return deposit + (deposit * taxRate);
    },
    futureValue: function (deposit, interestRate, inflationRate, yearsToInvest) {
      return deposit * ((1 + (interestRate - inflationRate))**yearsToInvest);
    },
    rrspTaxAmount: function (futureValue, retireTaxRate) {
      return futureValue * retireTaxRate;
    },
    getRrspAfterTaxFv: function (futureValue, retireTaxRate) {
      return futureValue - (futureValue * retireTaxRate);
    }
  };
  return __equations;
}());