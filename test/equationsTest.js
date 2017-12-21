const assert = require('chai').assert;
const equat = require('../scripts/modules/financialEquations');
const equations = __equations;

// Mocha does not like floats and will coerce them into whole numbers when calculating. Upon receiving a float it
// parses it as a string. My hypothesis is that this occurs during requiring the module so that it can encode it for tranfer.
// Corrected this in-app by parseFloat(answer) of my function returns.  

describe('Equations', function(){
  describe('afterTaxDeposit', function() {
    var mDAfterTaxDeposit = equations.afterTaxDeposit(2000, 0.40);
    it('should return only floats with no more than two end digits', function(){
      assert.match(mDAfterTaxDeposit, /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: *N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
    it('afterTaxDeposit(2000, 0.40) should return 2800.00', function(){
      assert.strictEqual('2800.00', mDAfterTaxDeposit, "Give format: *N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
  });
});

