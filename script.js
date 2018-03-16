var input = "";

function Input(i) {
	input += i;
	var txt = document.getElementById("Text").value;
	if (txt.length >= 20) {
		document.getElementById("Text").value = "";//txt.substring(0, txt.length - 1);
		//alert(document.getElementById("Text").value);
	}
    document.getElementById("Text").value+=i;
}

function remove() {
	//alert(input+" "+input.length);
	input = input.substring(0, input.length - 1);
	var txt = document.getElementById("Text").value;
	document.getElementById("Text").value = txt.substring(0, txt.length - 1);
}

function removeAll() {
	input = "";
	document.getElementById("Text").value = "";
}

function isSuanzi(c) {
	if (c == "+" || c == "-" || c == "*" || c == "/") {
		return true;
	}
	return false;
}

function validNum(a) {
	if (isSuanzi(a) || a == "(" || a == ")") return false;
	var xiaoshudian = 0;
	for (var i = 0; i < a.length; i++) {
		if (a[i] == ".") {
			xiaoshudian++;
		}
		if (xiaoshudian > 1) return false;
	}
	return true;
}


//1+2.5*3-(1+2*3)/7
function isValid(a) {
	var kuohao = 1;
	for (var i = 0; i < a.length; i++) {
		if (isSuanzi(a[i])) {
			if (i == 0 || i == a.length - 1) return false;
			if (isSuanzi(a[i - 1]) || isSuanzi(a[i + 1])) return false;
			if (a[i] == "/") {
				if (validNum(a[i + 1])) {
					if (a[i + 1] - 0 == 0) return false;
				}
			}
		} else if (a[i] == "(") {
			if (kuohao != 1) return false;
			kuohao = 0;
			if (i == a.length - 1) return false;
			if (!validNum(a[i + 1])) return false;
			if (i != 0) {if (!isSuanzi(a[i - 1])) return false;}
		} else if (a[i] == ")") {
			if (kuohao != 0) return false;
			kuohao = 1;
			if (i == 0) return false;
			if (!validNum(a[i - 1])) return false;
			if (i != a.length - 1) {if (!isSuanzi(a[i + 1])) return false;}
		} else {
			if (!validNum(a[i])) return false;
		}
	}
	return true;
}

function Replace(txt) {
	var res = new Array();
	var temp = "";
	var j = 0;
	var startNum = 0;
	for (var i = 0; i < txt.length; i++) {
		if (isSuanzi(txt[i]) || txt[i] == "(" || txt[i] == ")") {
		if (startNum == 1) {
			res[j] = temp;
			j++;
			temp = "";
			startNum = 0;
		}
		if (isSuanzi(txt[i])) {
			if (i == 0) {
				res[j] = "0";
				j++;
			}
			res[j] = txt[i];
			j++;
		} else if (txt[i] == "(" || txt[i] == ")") {
			if (txt[i] == "(" && (res.length > 0) && (validNum(res[j - 1]) || res[j - 1] == ")")) {
				res[j] = "*";
				j++;
			}
			res[j] = txt[i];
			j++;
		}
		} else {
			temp += txt[i];
			startNum = 1;
		}
	}
	if (startNum == 1) {
		res[j] = temp;
	}
	//alert(res);
	return res;
}

function GetAnswer() {
	var t=document.getElementById("Text").value;
	//alert(input+" " + input.length+"\n"+t+" "+t.length);
	var txt = input;//document.getElementById("Text").value;
	var spa = Replace(txt);

	if (!isValid(spa)) {
		alert("input is not valid!");
		document.getElementById("Text").value = "";
		input = "";
	}

	else {
		var num = new Array();
		var sign = new Array();
		for (var i = 0; i < spa.length; i++) {
			if (isSuanzi(spa[i]) || spa[i] == "(") {
				if (spa[i] == "+" || spa[i] == "-") {
					if (sign.length) {
						if (sign[length - 1] == "+") {
							num[num.length - 2] += num[num.length - 1];
						    num.pop();
						} else {
							num[num.length - 2] -= num[num.length - 1];
						    num.pop();							
						}
						sign.pop();
					}
				}
				sign.push(spa[i]);
			} else if (spa[i] == ")") {
				while (sign[sign.length - 1] != "(") {
					if (sign[sign.length - 1] == "+") {
						num[num.length - 2] += num[num.length - 1];
						num.pop();
					}
					else if (sign[sign.length - 1] == "-") {
						num[num.length - 2] -= num[num.length - 1];
						num.pop();
					}
					else if (sign[sign.length - 1] *= "*") {
						num[num.length - 2] *= num[num.length - 1];
						num.pop();
					}
					else if (sign[sign.length - 1] == "/") {
						if (num[num.length - 1] == 0) {
							alert("input is not valid!");
							document.getElementById("Text").value = "";
							return;
						}
						num[num.length - 2] /= num[num.length - 1];
						num.pop();
					}
					sign.pop();
				}
				sign.pop();
			} else {
				num.push(parseFloat(spa[i]));
				if (sign.length) {
					if (sign[sign.length - 1] == "*") {
						num[num.length - 2] *= num[num.length - 1];
						num.pop(); sign.pop();
					}
					else if (sign[sign.length - 1] == "/") {
						if (num[num.length - 1] == 0) {
							alert("(>▽<)input is not valid!");
							document.getElementById("Text").value = "";
							return;
						}
						num[num.length - 2] /= num[num.length - 1];
						num.pop(); sign.pop();
					}
				}
			}
		}
		while (sign.length > 0) {
					if (sign[sign.length - 1] == "+") {
						num[num.length - 2] += num[num.length - 1];
						num.pop(); sign.pop();
					}
					else if (sign[sign.length - 1] == "-") {
						num[num.length - 2] -= num[num.length - 1];
						num.pop(); sign.pop();
					}
					else if (sign[sign.length - 1] == "*") {
						num[num.length - 2] *= num[num.length - 1];
						num.pop(); sign.pop();
					}
					else if (sign[sign.length - 1] == "/") {
						if (num[num.length - 1] == 0) {
							alert("input is not valid!");
							document.getElementById("Text").value = "";
							return;
						}
						num[num.length - 2] /= num[num.length - 1];
						num.pop(); sign.pop();
					}
		}
		document.getElementById("Text").value ="";
		document.getElementById("Text").value += num[0];
		input = "";
		input += num[0];
	}
	
}