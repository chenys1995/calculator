QUnit.test("isVal_test", function(assert)
{
    assert.deepEqual(isVal(["val"]), true);
	assert.deepEqual(isVal(["vaI"]), false);
});
QUnit.test("isOper_test", function(assert)
{
    assert.deepEqual(isOper(["oper"]), true);
	assert.deepEqual(isOper(["val"]), false);
});
QUnit.test("neg_test", function(assert)
{
	tcs = [["val","-1"],["oper","add"],["val","5"]];
	assert.deepEqual(evaluate(tcs), 4);
	tcs = [["val","-1"],["oper","mul"],["val","6"]];
	assert.deepEqual(evaluate(tcs), -6);
	tcs = [["val","-2"],["oper","mul"],["val","6"]];
	assert.deepEqual(evaluate(tcs), -12);
	tcs = [["val","-6"],["oper","div"],["val","3"]];
	assert.deepEqual(evaluate(tcs), -2);
});
QUnit.test("arithmetric_test", function(assert)
{
	tcs = [["val","1"],["oper","add"],["val","2"],["oper","mul"],["mul","3"]];
	assert.deepEqual(evaluate(tcs), 7);
	tcs = [["val","4"],["oper","div"],["val","2"],["oper","mul"],["mul","3"],["oper","add"],["val","5"]];
	assert.deepEqual(evaluate(tcs), 11);
});
