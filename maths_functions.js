//----------------------max function--------------------------//
function maX(...arr) {
  return Math.max(...arr);
}
//----------------------fractional Part function--------------//
function fractionalPart(n){
    n = Math.abs(n)
  return n - Math.floor(n);
}
//----------------------logarithm Function--------------------//
function log(base, number){
  return Math.log(number)/Math.log(base);
}
//----------------------cosec function------------------------//
function COSeC(x){
  return 1/Math.sin(x);
}
//-----------------------sec Function-------------------------//
function sec(x){
  return 1/Math.cos(x);
}
//-----------------------cot Function-------------------------//
function cot(x){
  return 1/Math.tan(x);
}
//-----------------------cosec-1 Function-------------------------//
function aCOsec(x){
  if(Math.abs(x)>=1){
    return Math.asin(1/x);
  }
}
//-----------------------sec-1 Function-------------------------//
function aSec(x){
  let val;
  if(Math.abs(x) >= 1){
    val = Math.acos(1/x);
  }
  if(val < 0){
    return Math.PI - val;
  }
  else{
    return val;
  }
}
//-----------------------cot-1 Function-------------------------//
function aCot(x){
  let val = Math.atan(1/x);
  if(val < 0){
    return Math.PI - val;
  }
  else{
    return val;
  }
}
//-----------------------sinh Function---------------------------//
function SINH(x){
  return Math.sinh(x);
}
//-----------------------cosh Function---------------------------//
function COSH(x){
  return Math.cosh(x);
}
//-----------------------tanh Function---------------------------//
function TANH(x){
  return Math.tanh(x);
}
//------------------------------------------------Function math to js----------------------------------------//
function mathToJs(math) {
  let fns = ['+', '-', '*', '/', '^', '%', 'n', 's', 'h', 'm', 'g', 'c', 't', '(', '{', '[', 'X', ' ', ',']
  let nums = '0123456789';
  let str = '';
  for (let i = 0; i < math.length; i++) {
    ch = math[i];
    if (i != 0 && '[{('.includes(math[i]) && !fns.includes(math[i - 1])) {
      ch = `*${math[i]}`;
    }
    else if (i != math.length - 1 && ')}]'.includes(math[i]) && !')}]'.includes(math[i + 1]) && !fns.includes(math[i + 1])) {
      ch = `${math[i]}*`;
    }
    else if (math[i] == 'x' && (nums.includes(math[i - 1]) || 'ei'.includes(math[i - 1]))) {
      ch = '*x';
    }
    else if (math[i] == 'x' && (nums.includes(math[i + 1]) || 'sctamlep'.includes(math[i + 1]))) {
      ch = 'x*';
    }
    else if (nums.includes(math[i]) && 'ei'.includes(math[i - 1])) {
      ch = `*${amth[i]}`;
    }
    else if (nums.includes(math[i]) && 'sctamlep'.includes(math[i + 1])) {
      ch = `${math[i]}*`
    }
    str += ch
  }
  let js = str.replaceAll('^', '**');
  js = js.replaceAll('sinh', 'SINH');
  js = js.replaceAll('cosh', 'COSH');
  js = js.replaceAll('tanh', 'TANH');
  js = js.replaceAll('sin', 'Math.sin');
  js = js.replaceAll('cosec', 'COSeC');
  js = js.replaceAll('cos', 'Math.cos');
  js = js.replaceAll('tan', 'Math.tan');
  js = js.replaceAll('aSin', 'Math.asin');
  js = js.replaceAll('aCosec', 'aCOsec');
  js = js.replaceAll('aCos', 'Math.acos');
  js = js.replaceAll('aTan', 'Math.atan');
  js = js.replaceAll('sgnm', 'Math.sign');
  js = js.replaceAll('min', 'Math.min');
  js = js.replaceAll('ln', 'Math.log');
  js = js.replaceAll('E', 'Math.E');
  js = js.replaceAll('pi', 'Math.PI');
  js = js.replaceAll('abs', 'Math.abs');
  js = js.replaceAll('[', 'Math.floor(');
  js = js.replaceAll(']', ')');
  js = js.replaceAll('{', 'fractionalPart(');
  js = js.replaceAll('}', ')');
  return js;
}