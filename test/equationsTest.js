const assert = require('chai').assert;
const equat = require('../scripts/modules/financialEquations');
const equations = __equations;

// Mocha does not like floats and will coerce them into whole numbers when calculating. Upon receiving a float it
// parses it as a string. My hypothesis is that this occurs during requiring the module because it may encode it for tranfer.
// Corrected this in-app by parseFloat(answer) of my function returns, ensuring accuracy. Kept string form in testing to
// prevent loss of decimal places by number coercion.

describe('Equations', function(){
  describe('afterTaxDeposit', function() {
    var mDAfterTaxDeposit = equations.afterTaxDeposit(2000, 0.40);
    it('should return only a numeric value with two end digits', function(){
      assert.match(mDAfterTaxDeposit, /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: *N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
    it('afterTaxDeposit(2000, 0.40) should return 2800.00', function(){
      assert.strictEqual('2800.00', mDAfterTaxDeposit, "Give format: *N.NN");
    });
  });
  
  describe('futureValue', function() {
    var mDFutureValue = equations.futureValue(2000, 0.06, 0.03, 20);
    it('should return only a numeric value with two end digits', function(){
      assert.match(mDFutureValue, /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: *N.NN");
    });
    it('futureValue(2000, 0.06, 0.03, 20) should return 3612.22', function(){
      assert.strictEqual('3612.22', mDFutureValue, "Give format: *N.NN");
    });
  });

  describe('rrspTaxAmount', function() {
    var mDRrspTaxAmount = equations.rrspTaxAmount(3612.22, 0.40);
    it('should return only a numeric value with two end digits', function(){
      assert.match(mDRrspTaxAmount, /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: *N.NN");
    });
    it('rrspTaxAmount(3612.22, 0.40) should return 1444.89', function(){
      assert.strictEqual('1444.89', mDRrspTaxAmount, "Give format: *N.NN");
    });
  });

  describe('getRrspAfterTaxFv', function() {
    var mDGetRrspAfterTaxFv = equations.getRrspAfterTaxFv(3612.22, 0.40);
    it('should return only a numeric value with two end digits', function(){
      assert.match(mDGetRrspAfterTaxFv, /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: *N.NN");
    });
    it('getRrspAfterTaxFv(3612.22, 0.40) should return 2167.33', function(){
      assert.strictEqual('2167.33', mDGetRrspAfterTaxFv, "Give format: *N.NN");
    });
  });
});

