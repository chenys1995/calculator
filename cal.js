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
			console.log(top)
			top = parseInt(top,10)*10;
			console.log(top)
			top = parseInt(top,10) + parseInt(op,10);
			console.log(top)
		}
		else top = op;
		expr.push(top);
	}
	console.log(expr)
	reload();
}

function sign_change(){
	var top = expr.pop();
	top *= -1;
	expr.push(top);
	reload();
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