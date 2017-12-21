// __equations is self-made library imported into index.html (global scope)
// I chose this method to allow 'modules' without needing to run a server to compile ES6 syntax into ES5.
var equations = __equations;

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
  };

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
  };

  function getFvRrsp(user) {
    return equations.futureValue(user.depositAmount, user.interestRate, user.inflationRate, user.yearsToInvest);
  };

  function getRrspTaxAmount(user) {
    return equations.rrspTaxAmount(user.fvRrsp, user.retireTaxRate);
  };

  function getRrspAfterTaxFv(user) {
    return equations.getRrspAfterTaxFv(user.fvRrsp, user.retireTaxRate);
  };

  // jQuery executables
  function lookupKeyValueResponse(objKey) {
    if (objKey === 'depositAmount') {
      return "Your original RRSP deposit is $";
    } else if (objKey === 'tfsaDeposit') {
      return "Your total TFSA deposit (before tax) is $";
    } else if (objKey === 'fvTfsa') {
      return "The Future Value of your TFSA is $";
    } else if (objKey === 'fvRrsp') {
      return "The Future Value of your RRSP is $";
    } else if (objKey === 'taxRrsp') {
      return "The taxes paid on your RRSP during retirement are $";
    } else if (objKey === 'afterTaxFvRrsp') {
      return "The total take-home amount of your RRSP's are $";
    } else {
      return false;
    }
  }

  function renderResults(user) {
    user.forEach(function(value, index) {
      resultsContainer.append(value);
    });
  }

  function renderAllInformation(user) {
    var userInfo = [];
    $.each(user, function( key, value ) {
      if (lookupKeyValueResponse(key)) {
        userInfo.push('<p class="finance-calc-result">' + lookupKeyValueResponse(key) + value + '</p>');
      }
    });
    renderResults(userInfo);
  }

  // run operations in order...
  function runFinalComputation(user) {
    updateAccount(user, "tfsaDeposit", updateTfsaDeposit(user));
    updateAccount(user, "fvTfsa", getFvTfsa(user));
    updateAccount(user, "fvRrsp", getFvRrsp(user));
    updateAccount(user, "taxRrsp", getRrspTaxAmount(user));
    updateAccount(user, "afterTaxFvRrsp", getRrspAfterTaxFv(user));

    renderAllInformation(user);
  };

  // form commands
  form.submit(function(event) {
    event.preventDefault();
    runFinalComputation(testData);
    formButton.addClass("hide");
  });
});