// Reference: https://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796 
window.__equations = (function () { 
  
  function formatFloat(floatNum) {
    return parseFloat(Math.round(floatNum * 100) / 100).toFixed(2);
  }

  var __equations = {
    afterTaxDeposit: function (deposit, taxRate) {
    return formatFloat(deposit + (deposit * taxRate));
    },
    futureValue: function (deposit, interestRate, inflationRate, yearsToInvest) {
      return formatFloat(deposit * ((1 + (interestRate - inflationRate))**yearsToInvest));
    },
    rrspTaxAmount: function (futureValue, retireTaxRate) {
      return formatFloat(futureValue * retireTaxRate);
    },
    getRrspAfterTaxFv: function (futureValue, retireTaxRate) {
      return formatFloat(futureValue - (futureValue * retireTaxRate));
    }
  };
  return __equations;
}());