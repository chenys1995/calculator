QUnit.module("groupA");
function init(){
	let calc = new Calc();
  render({calc});
  $('.button').on('click', function(e) {
    if ($(this).hasClass('disabled')) return;
    let content = $(this).data('content');
    calc.exec(content)
      .then(() => {
        render({calc});
      })
      .catch(err => console.log(err));
  });
  $('.base').on('click', function(e) {
    let content = $(this).data('content');
    calc.base = content|0;
    calc.exec('')
      .then(() => {
        render({calc});
      })
      .catch(err => console.log(err));
  });

  keyBinging.forEach(({key, content}) => {
    Mousetrap.bind(key, () => $(`.button[data-content=${content}]`).click());
    $(`.button[data-content=${content}]`).attr('title', `[${key}]`);
  })
  Mousetrap.bind('h e x', () => $(`.base.hex`).click());
  Mousetrap.bind('d e c', () => $(`.base.dec`).click());
  Mousetrap.bind('o c t', () => $(`.base.oct`).click());
  Mousetrap.bind('b i n', () => $(`.base.bin`).click());
}
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
QUnit.test("Trigger_test", function(assert)
{
	init();
	$(`.button[data-content=${'val-1'}]`).trigger("click");
	$(`.button[data-content=${'oper-add'}]`).trigger("click");
	$(`.button[data-content=${'val-2'}]`).trigger("click");
	$(`.button[data-content=${'calc'}]`).trigger("click");
	var done = assert.async();
	var input = $('.value').focus();
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"3");
	done();
	}, 1000);
});
QUnit.test("DOM_test", function(assert)
{
	init();
	assert.expect(6);
	var done = assert.async(6);
	var input = $('.value');
	$(`.button[data-content=${'val-1'}]`).trigger("click");
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"1");
	$(`.button[data-content=${'val-2'}]`).trigger("click");
	done();
	},1000);
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"12");
	$(`.button[data-content=${'val-3'}]`).trigger("click");
	done();
	},1000);
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"123");
	$(`.button[data-content=${'oper-add'}]`).trigger("click");
	done();
	},1000);
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"123");
	$(`.button[data-content=${'val-2'}]`).trigger("click");
	done();
	},1000);
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"2");
	$(`.button[data-content=${'calc'}]`).trigger("click");
	done();
	},1000);
	setTimeout(function() {
	assert.equal(input[0].innerHTML,"125");
	done();
	},1000);
});