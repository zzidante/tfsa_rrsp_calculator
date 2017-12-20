const assert = require('chai').assert;
const equations = require('../scripts/modules/equations');

describe('Equations', function(){
  describe('afterTaxDeposit', function() {
    it('should return a number', function(){
      assert.typeOf(equations.afterTaxDeposit(), 'number');
    });
    it('should return only floats with no more than two end digits', function(){
      assert.match(equations.afterTaxDeposit(), /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
  });
  
  describe('futureValue', function() {
    it('should return a number', function(){
      assert.typeOf(equations.futureValue(), 'number');
    });
    it('should return only floats with no more than two end digits', function(){
      assert.match(equations.futureValue(), /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
  });

  describe('rrspTaxAmount', function() {
    it('should return a number', function(){
      assert.typeOf(equations.rrspTaxAmount(), 'number');
    });
    it('should return only floats with no more than two end digits', function(){
      assert.match(equations.rrspTaxAmount(), /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: N.NN"); 
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
  });

  describe('tsfaAfterTaxFutureValue', function() {
    it('should return a number', function(){
      assert.typeOf(equations.tsfaAfterTaxFutureValue(), 'number');
    });
    it('should return only floats with no more than two end digits', function(){
      assert.match(equations.tsfaAfterTaxFutureValue(), /^[0-9]+(\.[0-9]{1,2})?$/, "Give format: N.NN");
      // Reference: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    });
  });
});

