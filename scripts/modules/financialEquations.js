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
    afterTaxDeposit: function (acc, deposit, taxRate) {
    return acc === "rrsp" ? 
      deposit : 
      deposit - (deposit * taxRate);
    },
    futureValue: function (userInput) {
      return userInput.depositAmount * ((1 + (userInput.interestRate - userInput.inflationRate))**userInput.yearsToInvest);
    },
    rrspTaxAmount: function (userInput) {
      return userInput.depositAmount * ((1 + (userInput.interestRate - userInput.inflationRate))**userInput.yearsToInvest);
    },
    tsfaAfterTaxFutureValue: function (userInput) {
      return userInput.depositAmount * ((1 + (userInput.interestRate - userInput.inflationRate))**userInput.yearsToInvest);
    }
  };
  return __equations;
}());