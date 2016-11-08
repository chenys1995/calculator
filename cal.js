var expr =  [];
function infix_expr(op){
	if(op =="+" || op =="-" || op =="*" || op =="/" || op =="%"){
		expr.push(op);
	}
	else {
		var top = 0,leng = expr.length;
		if(leng != 0) {
			top = expr.pop();
			if(top =="+" || top =="-" || top =="*" || top =="/" || top =="%"){
				expr.push(top);
				expr.push(op);
				reload();
				return;
			}
			top += op;
		}
		else top = op;
		expr.push(top);
	}
	//console.log(expr)
	reload();
}
 function InfixtoPostfix(){
	var pfixString = [];
	var infixStack = [];
	
	// Helper function to get the precedence of the operator
	var precedence = function(operator){
		switch(operator){
		case "*":
		case "/":
		case "%":
			return 2;
		case "+":
		case "-":
			return 1;
		default:
			return 0;
		}
	}
	var l = expr.length;
	for(var i=0; i<l; i++){
		var c = expr[i];
		if(!isNaN(parseInt(c))){
			pfixString.push(c);
		}else if(c === "+" || c==="-" || c === "*" || c==="/" || c==="%"){
			while(!isEmpty(infixStack) && (precedence(c) <= precedence(get_top(infixStack)))){
				pfixString.push(infixStack.pop());
			}
			infixStack.push(c);
		}
	}
	
	while(!isEmpty(infixStack)){
		pfixString.push(infixStack.pop());
	}
	return pfixString;
}
function isEmpty(stack){
	return stack.length ===0
}
function get_top(stack){
	var top = stack.pop();
	stack.push(top);
	return top;
}
function eval(){
	var postfix = InfixtoPostfix();
	var stack =[];
	for(var i in postfix){
		 switch(postfix[i]){
			 case "+":
				var op2 = stack.pop(),op1 = stack.pop();
				stack.push(parseInt(op1,10)+parseInt(op2,10));
				break;
			 case "-":
				var op2 = stack.pop(),op1 = stack.pop();
				stack.push(parseInt(op1,10)-parseInt(op2,10));
				break;
			 case "*":
				var op2 = stack.pop(),op1 = stack.pop();
				stack.push(parseInt(op1,10)*parseInt(op2,10));
				break;
			 case "/":
				var op2 = stack.pop(),op1 = stack.pop();
				if(parseInt(op2,10) != 0)
					stack.push(parseInt(op1,10)/parseInt(op2,10));
				else stack.push(NaN);
				break;
			 case "%":
				var op2 = stack.pop(),op1 = stack.pop();
				if(parseInt(op2,10) != 0)
					stack.push(parseInt(op1,10)%parseInt(op2,10));
				else stack.push(NaN);
				break;
			 default:
				stack.push(postfix[i]);
				break;
		 }
		// console.log(stack)
	}
	display(get_top(stack));
	reload();
}
function sign_change(){
	var top = expr.pop();
	top *= -1;
	expr.push(top);
	reload();
}
function display(ans){
	var result_hex = document.getElementById("result_hex");
	var result_dec = document.getElementById("result_dec");
	var result_oct = document.getElementById("result_oct");
	var result_bin = document.getElementById("result_bin");
	if(parseInt(ans,10) < 0){
		var bar =parseInt("FFFFFFFF",16) - (parseInt(ans) * -1) +1;
		var hex = bar.toString(16),oct =bar.toString(8),bin=bar.toString(2);
		result_hex.innerHTML = "HEX "+hex;
		result_dec.innerHTML = "DEC " +parseInt(ans,10);
		result_oct.innerHTML = "OCT " +oct;
		result_bin.innerHTML = "BIN " +bin;
	}
	else {
		var hex = ans.toString(16),oct =ans.toString(8),bin=ans.toString(2);
		result_hex.innerHTML = "HEX "+hex;
		result_dec.innerHTML = "DEC " +parseInt(hex,16);
		result_oct.innerHTML = "OCT " +oct;
		result_bin.innerHTML = "BIN " +bin;
	}
}
function reload(){
	var result = document.getElementById("result");
	var leng = expr.length;
	var str =[];
	for(var i in expr){
		if(expr[i] =="+" || expr[i] =="-" || expr[i] =="*" || expr[i] =="/" || expr[i] =="%"){
			str +=" ";
			str +=expr[i];
			str +=" ";
		}
		else  str +=expr[i];
	}
	result.innerHTML = str; 
}
function ce(){
	expr =[]
	display(0);
	var result = document.getElementById("result");
	result.innerHTML = 0; 
}
function backspace(){
	var top = expr.pop(),leng = top.length;
	top = top.substr(0,leng-1);
	expr.push(top);
	reload();
}
function c(){
	expr.pop();
	display(0);
	reload();
	if(isEmpty(expr)){
		var result = document.getElementById("result");
		result.innerHTML = 0; 
	}
}
