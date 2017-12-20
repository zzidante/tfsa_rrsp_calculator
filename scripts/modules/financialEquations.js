window.__equations = (function () {

  // userInput is an object, takes in...
    // account = tfsa || rrsp
    // depositAmount = integer
    // interestRate = float
    // yearsToInvest = integer
    // marginalTaxRate = float
    // retireTaxRate = float
    // inflationRate = float
   
  var __equations = {
    afterTaxDeposit: function (userInput) {
      var equat;
      if (userInput.account === "tfsa") {
        equat = userInput.depositAmount
      } else {
        equat = userInput.depositAmount - (userInput.depositAmount * userInput.marginalTaxRate);
      }
      return equat;
    },
    futureValue: function (userInput) {
      var equat;
      if (userInput.account === "tfsa") {
        equat = userInput.depositAmount
      } else {
        equat = userInput.depositAmount - (userInput.depositAmount * userInput.marginalTaxRate);
      }
      return equat;
    },
  };
  return __equations;
}());