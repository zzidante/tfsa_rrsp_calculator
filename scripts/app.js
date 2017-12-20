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
    yearsToInvest: 10,
    marginalTaxRate: 0.05,
    retireTaxRate: 0.04,
    inflationRate: 0.03,
    tfsaDeposit: 0,
    fvTfsa: 0,
    fvRrsp: 0,
    taxRrsp: 0,
    afterTaxFvTfsa: 0
  }

  // Compute Data from User
  var rrspDeposit = testData.depositAmount  
  var tfsaDeposit = updateAccount(testData, "tfsaDeposit", tfsaDeposit());

  function tfsaDeposit() {
    return equations.afterTaxDeposit(testData, testData.depositAmount, testData.marginalTaxRate);
  };
  
  function updateAccount(account, key, update) {
    account.key = update;
    return account.key; 
  };
  
  function showResults() {
    console.log(tfsaDeposit, rrspDeposit);
  }

  showResults();
});