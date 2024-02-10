function action(el){
    let ob=document.getElementById('ta')
    let val=ob.value;
   switch(el){
    case 10:el=".";
    break;
    case 11:el="+";
    break;
    case 12:el="-";
    break;
    case 13:el="*";
    break;
    case 14:el="/";
    break;
    case 16:el="%";
    break;
    case 17:el="";
    val="";
    break;
	case 18:el="00";
	break;
    default:break;
   }
   if(el==15){
    val=val.substring(0,val.length-1);
    ob.value=val;
    return;
   }
   console.log(val.length);
    val=val+el;
    ob.value=val;
}
function isoperator(op){
	if(op=='+'||op=='-'||op=='/'||op=='*'||op=='%'){
		return true;
	}
	return false;
}  
function tokenize(exp){
	const token=[];
	let temp="";
	let cur="";
	for(let i=0;i<exp.length;i++){
		cur=exp[i];
		if(isoperator(cur)||cur=='('||cur==')'){
			if(temp!=""){
			token.push(temp);
			temp="";}
			token.push(cur);
		}
		else{
			temp=temp+cur;
		}
	}
	if(temp!=""){
	token.push(temp);}
	//console.log(token);
	return token;
}
function prec(c) {
	if(c == '^')
		return 3;
	else if(c == '/' || c=='*' || c=='%')
		return 2;
	else if(c == '+' || c == '-')
		return 1;
	else
		return -1;
}
function infixToPostfix(s) {
	const token=tokenize(s);
	console.log(token);
	let st = []; //For stack operations, we are using JavaScript built in stack
	let result=[];

	for(let i = 0; i < token.length; i++) {
		let c = token[i];

		// If the scanned character is
		// an operand, add it to output string.
		if(!isNaN(parseFloat(c)))
			result.push(c);

		// If the scanned character is an
		// ‘(‘, push it to the stack.
		else if(c == '(')
			st.push('(');

		// If the scanned character is an ‘)’,
		// pop and to output string from the stack
		// until an ‘(‘ is encountered.
		else if(c == ')') {
			while(st[st.length - 1] != '(')
			{
				result.push(st[st.length - 1]);
				st.pop();
			}
			st.pop();
		}

		//If an operator is scanned
		else {
			while(st.length != 0 && st[st.length-1]!='('&& prec(c) <=prec(st[st.length - 1])) {
				result.push(st[st.length - 1]);
				st.pop();
			}
			st.push(c);
		}
	}

	// Pop all the remaining elements from the stack
	while(st.length != 0) {
		result.push(st[st.length - 1]);
		st.pop();
	}
	
	return result;
}
function evaluatePostfix(exp)
{
	//create a stack
		let stack=[];
		
		// Scan all characters one by one
		for(let i=0;i<exp.length;i++)
		{
			let c=exp[i];
			console.log(c);
			// If the scanned character is an operand (number here),
			// push it to the stack.
			if(! isNaN( parseFloat(c) ))
			stack.push(parseFloat(c));
			//stack.push(c.charCodeAt(0) - '0'.charCodeAt(0));
			
			// If the scanned character is an operator, pop two
			// elements from stack apply the operator
			else
			{
				let val1 = stack.pop();
				let val2 = stack.pop();
				
				switch(c)
				{
					case '+':
					stack.push(val2+val1);
					break;
					
					case '-':
					stack.push(val2- val1);
					break;
					
					case '/':
					stack.push(val2/val1);
					break;
					
					case '*':
					stack.push(val2*val1);
					break;
					case '%':
						stack.push(val2%val1);
						break;
			}
			}
		}
		return stack.pop();
}
function eval(){
 
	
	let ob=document.getElementById('ta')
    let val=ob.value;
	let itp=infixToPostfix(val);
    console.log(itp);
    let ans=evaluatePostfix(itp);
    console.log("ans is "+ans);
    ob.value="";
	ob.value=ans;
}
document.addEventListener("keypress",(event)=>{
	// event.preventDefault();
	if(event.key==="Enter"){
		eval();
	}
});