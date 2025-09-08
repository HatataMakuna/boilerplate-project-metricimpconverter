const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1
    test('convertHandler should correctly read a whole number input.', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    // #2
    test('convertHandler should correctly read a decimal number input.', function(done) {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input),3.2);
      done();
    });
    // #3
    test('convertHandler should correctly read a fractional input.', function(done) {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    });
    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', function(done) {
      let input = '5.4/3L';
      assert.equal(convertHandler.getNum(input),1.8);
      done();
    });
    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done) {
      let input = '3/2/3L';
      assert.equal(convertHandler.getNum(input),undefined);
      done();
    });
    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });
    // #7
    test('convertHandler should correctly read each valid input unit.', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let expect = ['gal','l','mi','km','lbs','kg','gal','l','mi','km','lbs','kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
      done();
    });
    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', function(done) {
      let input = '32g';
      assert.equal(convertHandler.getUnit(input),undefined);
      done();
    });
    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    // #11
    test('convertHandler should correctly convert gal to L.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [18.9271, 0, 9.46425, 38.20823, 16.63993];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'gal'), expect[i], 0.1);
      });
      done();
    });
    // #12
    test('convertHandler should correctly convert L to gal.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [1.32086, 0, 0.66043, 2.66743, 1.16211];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'l'), expect[i], 0.1);
      });
      done();
    });
    // #13
    test('convertHandler should correctly convert mi to km.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [8.0467, 0, 4.02335, 16.24963, 7.08162];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'mi'), expect[i], 0.1);
      });
      done();
    });
    // #14
    test('convertHandler should correctly convert km to mi.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [3.10686, 0, 1.55343, 6.27323, 2.73545];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'km'), expect[i], 0.1);
      });
      done();
    });
    // #15
    test('convertHandler should correctly convert lbs to kg.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [2.26796, 0, 1.13398, 4.58159, 1.9958];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'lbs'), expect[i], 0.1);
      });
      done();
    });
    // #16
    test('convertHandler should correctly convert kg to lbs.', function(done) {
      let input = [5, 0, 2.5, 10.1, 4.4];
      let expect = [11.02312, 0, 5.51156, 22.26777, 9.70058];
      input.forEach(function(ele, i) {
        assert.approximately(convertHandler.convert(ele, 'kg'), expect[i], 0.1);
      });
      done();
    });
});