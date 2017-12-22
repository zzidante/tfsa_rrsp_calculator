// Reference: https://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796 
// Reference: https://stackoverflow.com/questions/29324888/working-with-global-window-variable-in-mocha-js-from-node 
// conditional allows for tests to run

if (typeof window === 'undefined') {
  var window = global;
}
  window.__equations = (function () { 
    
    function formatFloat(floatNum) {
      return parseFloat(Math.round(floatNum * 100) / 100).toFixed(2);
    }

    var __equations = {
      afterTaxDeposit: function (deposit, taxRate) {
      return formatFloat(deposit + (deposit * taxRate));
      },
      futureValue: function (deposit, interestRate, inflationRate, yearsToInvest) {
        return formatFloat(deposit * Math.pow(1 + (interestRate - inflationRate), yearsToInvest));
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
