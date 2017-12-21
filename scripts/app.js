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
    return equations.futureValue(user.depositAmount, user.interestRate, user.inflationRate, user.yearsToInvest);
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
    if (objKey === 'yearsToInvest') {
      return "Years investing: ";
    } else if (objKey === 'depositAmount') {
      return "Your original RRSP deposit is $";
    } else if (objKey === 'tfsaDeposit') {
      return "To match your RRSP contribution, your total TFSA deposit (before tax deducation) is $";
    } else if (objKey === 'fvTfsa') {
      return "The Future Value of your TFSA is $";
    } else if (objKey === 'fvRrsp') {
      return "The Future Value of your RRSP is $";
    } else if (objKey === 'taxRrsp') {
      return "The tax paid on your RRSP during retirement is $";
    } else if (objKey === 'afterTaxFvRrsp') {
      return "The total take-home amount of your RRSP is $";
    } else if (objKey === 'fvTfsaTotalPrompt') {
      return "The total take-home amount of your TFSA is $";
    } else {
      return false;
    }
  }

  function renderResults(userInfo) {
    var deposit = userInfo.depositAmount;
    var yearsToInvest = userInfo.yearsToInvest;
    var tfsaDeposit = userInfo.tfsaDeposit;
    var fvTfsa = userInfo.fvTfsa;
    var fvRrsp = userInfo.fvRrsp;
    var afterTaxFvRrsp = userInfo.afterTaxFvRrsp;
    var taxRrsp = userInfo.taxRrsp;
    var fvTfsaTotalPrompt = userInfo.fvTfsaTotalPrompt;

    resultsContainer
      .append(yearsToInvest)
      .append(deposit)
      .append(tfsaDeposit)
      .append(fvRrsp)
      .append(fvTfsa)
      .append(taxRrsp)
      .append(afterTaxFvRrsp)
      .append(fvTfsaTotalPrompt);


  };

  function renderAllInformation(user) {
    var userInfo = {};
    $.each(user, function(key, value) {
      if (lookupKeyValueResponse(key)) {
        userInfo[key] = ('<p class="finance-calc-result">' + lookupKeyValueResponse(key) + value + '</p>');
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
    updateAccount(user, "fvTfsaTotalPrompt", user.fvTfsa);

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