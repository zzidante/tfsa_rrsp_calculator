// __equations is self-made library imported into index.html (global scope)
// I chose this method to allow 'modules' without needing to run a server to compile ES6 syntax into ES5.
var equations = __equations  

$(function() {
  var form = $('#financial-calculator');  
  var formButton = $('#financial-calculator-btn');
  var resultsContainer = $('#results-container');

  var testData = {
    depositAmount: 100, 
    interestRate: 0.06,
    yearsToInvest: 40,
    marginalTaxRate: 0.4,
    retireTaxRate: 0.4,
    inflationRate: 0.05,

    tfsaDeposit: 0,
    fvTfsa: 0,
    fvRrsp: 0,
    taxRrsp: 0,
    afterTaxFvRrsp: 0
  }

  // datahelper functions 
  function updateAccount(account, userKey, update) {
    account[userKey] = update;
    return account[userKey];
  };

  // async executables for computations
  function updateTfsaDeposit(user) {
    return equations.afterTaxDeposit(user.depositAmount, user.marginalTaxRate);
  };

  function getFvTfsa(user) {
    return equations.futureValue(user.tfsaDeposit, user.interestRate, user.inflationRate, user.yearsToInvest);
  }

  function getFvRrsp(user) {
    return equations.futureValue(user.depositAmount, user.interestRate, user.inflationRate, user.yearsToInvest);
  }

  function getRrspTaxAmount(user) {
    return equations.rrspTaxAmount(user.fvRrsp, user.retireTaxRate);
  }

  function getRrspAfterTaxFv(user) {
    return equations.getRrspAfterTaxFv(user.fvRrsp, user.retireTaxRate);
  }

    // run operations in order...
  function runFinalComputation(user) {
    updateAccount(user, "tfsaDeposit", updateTfsaDeposit(user));
    updateAccount(user, "fvTfsa", getFvTfsa(user));
    updateAccount(user, "fvRrsp", getFvRrsp(user));
    updateAccount(user, "taxRrsp", getRrspTaxAmount(user));
    updateAccount(user, "afterTaxFvRrsp", getRrspAfterTaxFv(user));
    console.log(user.fvTfsa, user.afterTaxFvRrsp);
  } 
  
  runFinalComputation(testData);
});