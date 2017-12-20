// __equations is self-made library imported into index.html (global scope)
// I chose this method to allow 'modules' without needing to run a server to compile ES6 syntax into ES5.
var equations = __equations

$(function() {
  var form = $('#financial-calculator');  
  var formButton = $('#financial-calculator-btn');
  var resultsContainer = $('#results-container');
  var testData = {
    account: "rrsp", 
    depositAmount: 100, 
    interestRate: 0.06,
    yearsToInvest: 10,
    marginalTaxRate: 0.05,
    retireTaxRate: 0.04,
    inflationRate: 0.03,
  }

  // actions.addResults(resultsContainer);
  console.log(equations.afterTaxDeposit(testData))
});