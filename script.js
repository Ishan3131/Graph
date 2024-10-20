let graph = document.querySelector("#graph");
let ctx = graph.getContext("2d");
graph.width = window.innerWidth * 3 / 4;
graph.height = window.innerHeight - 4.5;
let graph_detailed = false;
//--------------------------------------------Graph scale : (value of 1 unit)-------------------------------------------//
let scale;
//--------------------------------------------Creating a graph page function---------------------------------------------------
function graphPage(theme) {
  ctx.clearRect(0, 0, graph.width, graph.height);
  graph_detailed = false;
  scale = document.querySelector("#scale").value;
  //--------------------------------------------Creating X-axis and Y-axis----------------------------------------------------//
  ctx.fillStyle = theme;
  ctx.strokeStyle = theme;
  ctx.beginPath();
  ctx.moveTo(0, graph.height / 2);
  ctx.lineTo(graph.width, graph.height / 2);
  ctx.stroke();
  ctx.moveTo(graph.width / 2, 0);
  ctx.lineTo(graph.width / 2, graph.height);
  ctx.stroke();
  //--------------------------------------------Drawing '-' on Y axis to represent 1 unit-------------------------------------//
  let ih = 0;
  while (ih < graph.height / 2) {
    ih += 10;
    ctx.beginPath();
    ctx.moveTo(graph.width / 2 - 5, graph.height / 2 - ih);
    ctx.lineTo(graph.width / 2 + 5, graph.height / 2 - ih);
    ctx.stroke();
    ctx.moveTo(graph.width / 2 - 5, graph.height / 2 + ih);
    ctx.lineTo(graph.width / 2 + 5, graph.height / 2 + ih);
    ctx.stroke();
  }
  //---------------------------------------------Drawing '|' on x axis to represent 1 unit--------------------------------------//
  let iw = 0;
  while (iw < graph.width / 2) {
    iw += 10;
    ctx.beginPath();
    ctx.moveTo(graph.width / 2 + iw, graph.height / 2 - 5);
    ctx.lineTo(graph.width / 2 + iw, graph.height / 2 + 5);
    ctx.stroke();
    ctx.moveTo(graph.width / 2 - iw, graph.height / 2 - 5);
    ctx.lineTo(graph.width / 2 - iw, graph.height / 2 + 5);
    ctx.stroke();
  }
}
graphPage('black');
//------------------------------------------------POINT CLASS---------------------------------------------------------------------------//
class Point {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
//-------------------------------------------------More Functions---------------------------------------------//
//----------------------Function max--------------------------//
function maX(...arr) {
  return Math.max(...arr);
}
//----------------------Function fractional Part--------------//
function fractionalPart(n){
  return n - Math.floor(n);
}
//----------------------Logarithm Function--------------------//
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
  js = js.replaceAll('sin', 'Math.sin');
  js = js.replaceAll('cosec', 'COSeC');
  js = js.replaceAll('cos', 'Math.cos');
  js = js.replaceAll('tan', 'Math.tan');
  js = js.replaceAll('sinh', 'Math.sinh');
  js = js.replaceAll('cosh', 'Math.cosh');
  js = js.replaceAll('tanh', 'Math.tanh');
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
//---------------------------------------------------Function Plot-------------------------------------------//
function plot() {
  let func = document.querySelector('#function').value;             // Mathematical function enterd by user [ eg- f(x) = x**2 + 5*x - 6 ]
  document.querySelector('#function_log').value += `f(x) = ${func} :\n`;  // Adding function name in function log.
  let domain = [Number(document.querySelector('#domain_start').value), Number(document.querySelector('#domain_end').value)]  // Range of x
  let rate = Number(document.querySelector('#rate').value);              // Rate of increase in value of x
  let locus_color = document.querySelector('#locus_color').value;      // Color of locus(graph of f(x))

  func = mathToJs(func);
  function f(x) {
    let exp = func.replaceAll('x', `${x}`);                  // Replacing 'x' in the function with value of x 
    return eval(exp);                                          // Calculating f(x) or value of y
  }

  let x = domain[0];                                           // Initializing x
  //------------------------------------------------------PLOT FUNCTION-----------------------------------------------------------//
  function animation() {
    if (x >= Math.min(...domain) && x <= Math.max(...domain)) {
      let val = f(x);
      val = isNaN(val)?undefined:val;
      if (val != NaN && val != "Infinity" && val != "-Infinity") {
        let pp = new Point(graph.width / 2 + 10 * x / scale, graph.height / 2 - 10 * val / scale, 1, locus_color);
        pp.draw();
      }
      if (val == NaN) {
        document.querySelector('#function_log').value += `f(${x}) = undefined\n`;
      }
      else {
        document.querySelector('#function_log').value += `f(${x}) = ${val}\n`;
      }
      x = Number((x + rate).toFixed(5));
      if (x > Math.max(...domain)) {
        document.querySelector('#function_log').value += `   ---------------\n`;
      }
      requestAnimationFrame(animation);
    }
  }
  animation();
}
//-------------------------------------------given function log's function--------------------------------------------------------//
function function_log_appear() {
  if (document.querySelector("#function_log").style.display == "none") {
    document.querySelector('#arrow').classList.remove('arrow_down');
    document.querySelector('#arrow').classList.add('arrow_up');
    document.querySelector('#function_log').classList.remove('function_log_disappear');
    document.querySelector("#function_log").style.display = "block";
    document.querySelector('#function_log').classList.add('function_log_appear');
    document.querySelector('#clear_log').style.display = "block";
    document.querySelector('#clear_log').classList.remove('button_disappear');
    document.querySelector('#clear_log').classList.add('button_appear');
  }
  else {
    document.querySelector("#function_log").classList.remove('function_log_appear');
    document.querySelector('#function_log').classList.add('function_log_disappear');
    document.querySelector('#arrow').classList.remove('arrow_up');
    document.querySelector('#arrow').classList.add('arrow_down');
    document.querySelector('#clear_log').classList.remove('button_appear');
    document.querySelector('#clear_log').classList.add('button_disappear');
    setTimeout(() => {
      document.querySelector('#clear_log').style.display = "none";
      document.querySelector('#function_log').style.display = 'none';
    }, 1000)
  }
}
//-------------------------------------Rate descriptive function-------------------------------------------------------------//
function rate_describe() {
  if (document.querySelector("#rate_descriptive_container").style.display == "none") {
    document.querySelector('#rate_descriptive_container').style.display = "block";
  }
  else {
    document.querySelector("#rate_descriptive_container").style.display = "none";
  }
}
//-------------------------------------defaut input function---------------------------------------------------------------//
function default_input() {
  document.querySelector('#domain_start').value = -1 * Math.ceil(scale * graph.width / 20);
  document.querySelector('#domain_end').value = Math.ceil(scale * graph.width / 20);
  document.querySelector('#rate').value = scale / 10;
}

function clearLog() {
  document.querySelector('#function_log').value = '';
}

function more_option() {
  if (document.querySelector('#more_option_container').style.display == 'none') {
    document.querySelector('#more_option_container').classList.remove('more_option_disappear');
    document.querySelector('#more_option_container').style.display = 'block';
    document.querySelector('#more_option_container').classList.add('more_option_appear');
    document.querySelector('#more_option_symbol').style.color = '#ffffff';
  }
  else {
    document.querySelector('#more_option_container').classList.remove('more_option_appear');
    document.querySelector('#more_option_container').classList.add('more_option_disappear');
    setTimeout(() => {
      document.querySelector('#more_option_container').style.display = 'none';
      document.querySelector('#more_option_symbol').style.color = '#000000';
    }, 200)
  }
}

function detailed_graph() {
  if (graph_detailed == false) {
    graph_detailed = true;
    let iw = -1 * Math.ceil(graph.width / 20) - 1;
    while (iw <= Math.ceil(graph.width / 20) - 1) {
      iw += 2 + Math.floor((String(scale).length + 1) / 4);
      ctx.fillStyle = document.querySelector('#theme').style.borderColor;
      ctx.font = '7px Arial'
      ctx.fillText(Number((iw * scale).toFixed(String(scale.length))), graph.width / 2 + iw * 10, graph.height / 2 + 10);
    }
    let ih = -1 * Math.ceil(graph.height / 20) - 1;
    while (ih <= Math.ceil(graph.height / 20) - 1) {
      ih += 2;
      ctx.fillStyle = document.querySelector('#theme').style.borderColor;
      ctx.font = '7px Arial'
      ctx.fillText(Number((ih * scale).toFixed(String(scale.length))), graph.width / 2 + 10, graph.height / 2 - ih * 10);
    }
  }
  else {
    graph_detailed = false;
    graphPage(document.querySelector('#theme').style.borderColor);
  }
}

function theme() {
  if (document.body.style.backgroundColor == 'white') {
    document.body.style.backgroundColor = 'black';
    graphPage('white');
    document.querySelector('#theme').style.backgroundColor = 'black';
    document.querySelector('#theme').style.borderColor = 'white';
  }
  else {
    document.body.style.backgroundColor = 'white';
    graphPage('black');
    document.querySelector('#theme').style.backgroundColor = 'white';
    document.querySelector('#theme').style.borderColor = 'black';
  }
}
let x, y;
document.addEventListener('mousemove', (e) => {
  if (e.clientX < graph.width) {
    x = (e.clientX - graph.width / 2) / 10;
    y = (graph.height / 2 - e.clientY) / 10;
    document.querySelector('#cursor_x_cordinate').value = x;
    document.querySelector('#cursor_y_cordinate').value = y;
  }
})