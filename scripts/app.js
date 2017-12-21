// __equations is self-made library imported into index.html (global scope)
// I chose this method to allow 'modules' without needing to run a server to compile ES6 syntax into ES5.
var equations = __equations;

$(function() {
  var form = $('#financial-calculator');  
  var formButton = $('#financial-calculator-btn');
  var resultsContainer = $('#results-container');

  // datahelper functions 
  function updateAccount(account, userKey, update) {
    account[userKey] = update;
    return account[userKey];
  };

  function formatFormObj(form) {
    var formObj = {};
    $.each(form, function (i, input) {
      formObj[input.name] = input.value;
    });
    return turnValIntoPercent(formObj);
  };

  function turnValIntoPercent(formObj) {
    var formattedObj = {};
    $.each(formObj, function(objKey, value) {
      var valToPercent = value / 100;     
      if (objKey === "depositAmount") {
        formattedObj[objKey] = parseInt(value);
      } else if (objKey === "yearsToInvest") {
        formattedObj[objKey] = parseInt(value);
      } else {
        formattedObj[objKey] = parseFloat(valToPercent);
      }
    });
    return formattedObj;
  };

  // executables for computations
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

  function renderResults(userInfo) {
    userInfo.forEach(function(value, i) {
      resultsContainer.append(value);
    });
  }

  function renderAllInformation(user) {
    var userInfo = [];
    $.each(user, function(key, value) {
      if (lookupKeyValueResponse(key)) {
        userInfo.push('<p class="finance-calc-result">' + lookupKeyValueResponse(key) + value + '</p>');
      }
    });
    renderResults(userInfo);
  };

  function addRefreshButton(resultsContainer) {
    // Reference: https://stackoverflow.com/questions/29884654/button-that-refresh-page-on-click 
    return resultsContainer.append("<div class='btn-div'><input class='btn btn-primary' type='button' value='Make a New Calculation' onClick='window.location.href=window.location.href'></div.>")
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

  // form handling
  form.submit(function() {
    var userData = formatFormObj($(this).serializeArray()); 
    event.preventDefault();
    runFinalComputation(userData);
    form.addClass("hide");
    addRefreshButton(resultsContainer);

  });
});